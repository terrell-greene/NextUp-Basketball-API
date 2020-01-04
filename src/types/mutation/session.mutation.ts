import { mutationField, arg } from 'nexus'
import {
  ServerError,
  CreateSessionError,
  UpdateSessionError,
  AuthorizationError,
  JoinSessionError,
  UnjoinSessionError
} from '../../errors'
import moment = require('moment-timezone')

export const createSession = mutationField('createSession', {
  type: 'Session',
  args: { input: arg({ type: 'CreateSessionInput', required: true }) },
  resolve: async (_, { input }, { db, request }) => {
    const { courtId, start, end } = input
    const {
      body: { userId }
    } = request

    if (moment(start).diff(end, 'hours') > -1) {
      throw new CreateSessionError({
        data: { end: 'Sessions must be at least one hour long' }
      })
    }

    try {
      const court = await db.Court.findById(courtId).select('id coords address')

      if (!court) {
        throw new CreateSessionError({
          data: { courtId: 'No court exists with that id' }
        })
      }

      const newSession = await db.Session.create({
        court: court.id,
        coords: court.coords,
        createdBy: userId,
        timeZone: court.address.timeZone,
        start,
        end
      })

      const populatelatedSession = await db.Session.findById(
        newSession.id
      ).populate('court createdBy')

      return populatelatedSession!
    } catch (error) {
      if (error.data) {
        throw error
      } else {
        console.error(error)
        throw new ServerError()
      }
    }
  }
})

export const updateSession = mutationField('updateSession', {
  type: 'Session',
  args: {
    input: arg({ type: 'UpdateSessionInput', required: true })
  },
  resolve: async (_, { input }, { db, request }) => {
    const { sessionId, start, end } = input

    const {
      body: { userId }
    } = request

    const throwDurationError = () => {
      throw new UpdateSessionError({
        data: { end: 'Sessions must be at least one hour long' }
      })
    }

    try {
      const session = await db.Session.findById(sessionId).select(
        'createdBy start end'
      )

      if (!session) {
        throw new UpdateSessionError({
          data: { sessionId: 'No session exists with that id' }
        })
      }

      if (session.createdBy.toString() !== userId) {
        throw new AuthorizationError()
      }

      // If start and no end, check the diff between
      // new start and current end
      if (start && !end && moment(start).diff(session.end, 'hours') > -1) {
        throwDurationError()
      }

      // If no start and  end, check the diff between
      // current start and new end
      if (!start && end && moment(session.start).diff(end, 'hours') > -1) {
        throwDurationError()
      }

      // If start and end, check the diff between
      // new start and new end
      if (start && end && moment(start).diff(end, 'hours') > -1) {
        throwDurationError()
      }

      const updatedSession = await db.Session.findByIdAndUpdate(
        sessionId,
        { start: start ? start : session.start, end: end ? end : session.end },
        { new: true }
      ).populate('createdBy court attending')

      return updatedSession!
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})

export const joinSession = mutationField('joinSession', {
  type: 'Session',
  args: { input: arg({ type: 'JoinUnjoinSessionInput', required: true }) },
  resolve: async (_, { input }, { db, request }) => {
    const { sessionId } = input
    const {
      body: { userId }
    } = request

    try {
      const session = await db.Session.findById(sessionId).select(
        'createdBy attending'
      )

      if (!session) {
        throw new JoinSessionError({
          data: { sessionId: 'No session exists with that id' }
        })
      }

      const { createdBy, attending } = session

      const createdSession: boolean = createdBy.toString() === userId
      const alreadyAttending = attending.find(
        (user: string) => user.toString() === userId
      )

      if (alreadyAttending || createdSession) {
        throw new JoinSessionError({
          data: {
            session: 'User is already attending session'
          }
        })
      }

      const updatedSession = await db.Session.findByIdAndUpdate(
        sessionId,
        {
          $push: { attending: userId }
        },
        { new: true }
      ).populate('court createdBy attending')

      return updatedSession!
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})

export const unjoinSession = mutationField('unjoinSession', {
  type: 'Session',
  args: {
    input: arg({ type: 'JoinUnjoinSessionInput', required: true })
  },
  resolve: async (_, { input }, { db, request }) => {
    const { sessionId } = input
    const {
      body: { userId }
    } = request

    try {
      const session = await db.Session.findById(sessionId).select(
        'createdBy attending'
      )

      if (!session) {
        throw new JoinSessionError({
          data: { sessionId: 'No session exists with that id' }
        })
      }

      const { createdBy, attending } = session

      const alreadyAttending = attending.find(
        (user: string) => user.toString() === userId
      )
      const createdSession = createdBy.toString() === userId

      if (!alreadyAttending) {
        throw new UnjoinSessionError({
          data: {
            sessionId: 'User is not attending this session'
          }
        })
      }

      if (createdSession) {
        throw new UnjoinSessionError({
          data: {
            session:
              "User created session. Can't unjoin, must delete session instead."
          }
        })
      }

      const updatedSession = await db.Session.findByIdAndUpdate(
        sessionId,
        {
          $pull: { attending: userId }
        },
        { new: true }
      ).populate('court createdBy attending')

      return updatedSession!
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})
