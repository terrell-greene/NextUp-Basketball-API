import { rule, shield, allow } from 'graphql-shield'
import { Request } from 'express-serve-static-core'
import { verify } from 'jsonwebtoken'

import { Context } from '../context'
import { AuthorizationError } from '../errors'
import { APP_SECRET } from '../utils'

const getUser = async (
  req: Request
): Promise<{ userId: string; token: string }> => {
  const { authorization } = req.headers

  if (!authorization) throw new AuthorizationError()

  const token = authorization!.replace('Bearer ', '')

  try {
    const { userId } = (await verify(token, APP_SECRET)) as { userId: string }

    return { userId, token }
  } catch (error) {
    throw new AuthorizationError()
  }
}

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_, args, { request }: Context) => {
    const user = await getUser(request)

    request.body = {
      ...request.body,
      ...user
    }

    return true
  }
)

const isDeveloper = rule({ cache: 'contextual' })(
  async (_, args, { request, db }: Context) => {
    const { userId } = await getUser(request)

    const user = await db.User.findById(userId)

    if (!user || user.role !== 'DEVELOPER') return new AuthorizationError()

    request.body = {
      ...request.body,
      ...user
    }

    return true
  }
)

export default shield(
  {
    Query: {
      courts: allow,
      sessions: allow,
      suggestedCourts: isDeveloper
    },
    Mutation: {
      login: allow,
      signup: allow,
      suggestCourt: allow,
      createSession: isAuthenticated,
      updateSession: isAuthenticated,
      joinSession: isAuthenticated,
      unjoinSession: isAuthenticated,
      updateUser: isAuthenticated,
      deleteSuggestedCourt: isDeveloper,
      createCourt: isDeveloper
    }
  },
  { fallbackError: new AuthorizationError() }
)
