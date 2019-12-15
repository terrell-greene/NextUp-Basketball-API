import { mutationField, arg } from 'nexus'
import { ServerError, CreateSessionError } from '../../errors'
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
          data: { courtID: 'No court exists with that id' }
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
