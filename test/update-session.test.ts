import * as mongoose from 'mongoose'
import gql from 'graphql-tag'
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

const updateSessionMutation = gql`
  mutation UpdateSession($sessionId: ID!, $start: DateTime, $end: DateTime) {
    updateSession(input: { sessionId: $sessionId, start: $start, end: $end }) {
      id
      start
      end
    }
  }
`

describe('Update Session Mutation', () => {
  let client: GraphQLClient
  let sessionId: string

  let variables = {
    courtId: '',
    sessionId: '',
    start: '2019-12-17T04:52:09.777Z',
    end: '2019-12-17T08:52:09.777Z'
  }

  before(async () => {
    const { token } = await loginUser()

    const { courts } = await request(url, allCourts)

    variables.courtId = courts[0].id

    client = new GraphQLClient(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const { createSession } = await client.request(
      createSessionMutation,
      variables
    )
    variables.sessionId = createSession.id

    await mongoose.connect(process.env.MONGO_URI!, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    })
  })

  after(async () => {
    await Session.findByIdAndDelete(variables.sessionId)
  })

  it('should throw an error if not authorized', async () => {
    try {
      await request(url, updateSessionMutation, variables)
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name } = errors[0]

      expect(name).to.equal('AuthorizationError')
    }
  })

  it('should throw an error if no session found', async () => {
    try {
      await client.request(updateSessionMutation, {
        ...variables,
        sessionId: mongoId
      })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('UpdateSessionError')
      expect(data).to.have.property('sessionId')
    }
  })

  it('should throw an error if new start time is within in hour of the curret end time', async () => {
    try {
      const args = {
        sessionId: variables.sessionId,
        start: variables.end
      }
      await client.request(updateSessionMutation, args)
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('UpdateSessionError')
      expect(data).to.have.property('end')
    }
  })

  it('should throw an error if new end time is within in hour of the current start time', async () => {
    try {
      const args = {
        sessionId: variables.sessionId,
        end: variables.start
      }
      await client.request(updateSessionMutation, args)
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('UpdateSessionError')
      expect(data).to.have.property('end')
    }
  })

  it('should throw an error if both submitted start and end time are within an hour of each other', async () => {
    try {
      await client.request(updateSessionMutation, {
        ...variables,
        end: variables.start
      })
    } catch (error) {
      const {
        response: { errors }
      } = error as TestError

      const { name, data } = errors[0]

      expect(name).to.equal('UpdateSessionError')
      expect(data).to.have.property('end')
    }
  })

  it('should return an updated session', async () => {
    const newEndTime = new Date().toISOString()

    const { updateSession } = await client.request(updateSessionMutation, {
      ...variables,
      end: newEndTime
    })

    expect(updateSession).to.have.property('id')
    expect(updateSession).to.have.property('end')
    expect(updateSession.end).to.equal(newEndTime)
  })
})
