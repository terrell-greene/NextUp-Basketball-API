import * as mongoose from 'mongoose'
import { expect } from 'chai'
import { request, GraphQLClient } from 'graphql-request'

import {
  url,
  TestError,
  loginUser,
  mongoId,
  allCourts,
  createSessionMutation
} from './utils'
import { Session } from '../src/db'

describe('Create Session Mutation', () => {
  let client: GraphQLClient
  let sessionId: string
  let courtId: string

  let variables = {
    courtId: mongoId,
    start: '2019-12-17T04:52:09.777Z',
    end: '2019-12-17T08:52:09.777Z'
  }

  before(async () => {
    const { token } = await loginUser()

    const { courts } = await request(url, allCourts)

    courtId = courts[0].id

    client = new GraphQLClient(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  })

  afterEach(async () => {
    await Session.findByIdAndDelete(sessionId)
  })

  it('should throw an error if not authorized', async () => {
    try {
      await request(url, createSessionMutation, variables)
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name } = errors[0]

      expect(name).to.equal('AuthorizationError')
    }
  })

  it("should throw an error if times aren't an hour apart", async () => {
    try {
      await client.request(createSessionMutation, {
        ...variables,
        end: variables.start
      })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('CreateSessionError')
      expect(data).to.have.property('end')
    }
  })

  it('should throw an error if no court is found', async () => {
    try {
      await client.request(createSessionMutation, variables)
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError
      console.log(JSON.stringify(error[0]))

      const { name, data } = errors[0]

      expect(name).to.equal('CreateSessionError')
      expect(data).to.have.property('courtId')
    }
  })

  it('should return the created session object', async () => {
    const { createSession } = await client.request(createSessionMutation, {
      ...variables,
      courtId
    })

    expect(createSession).to.have.property('id')
    sessionId = createSession.id
  })
})
