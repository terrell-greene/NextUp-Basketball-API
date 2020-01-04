import { objectType } from 'nexus'
import * as moment from 'moment-timezone'

export const Session = objectType({
  name: 'Session',
  definition(t) {
    t.id('id')
    t.string('timeZone')
    t.field('createdBy', { type: 'User' })
    t.list.field('attending', { type: 'User' })
    t.field('court', { type: 'Court' })
    t.field('coords', { type: 'Coords' })

    t.datetime('start')
    t.datetime('end')

    t.int('numberAttending', {
      resolve: async ({ id }, args, ctx) => {
        const session = await ctx.db.Session.findById(id).select('attending')

        return session!.attending.length + 1
      }
    })

    t.string('times', {
      resolve: async ({ start, end, timeZone }, args, ctx) => {
        const formatTime = (time: Date) =>
          moment(time)
            .tz(timeZone)
            .format('h:mma')

        return `${formatTime(start)} - ${formatTime(end)}`
      }
    })

    t.string('date', {
      resolve: async ({ start, timeZone }, args, ctx) => {
        const oneWeek = moment().add(7, 'days')

        if (
          moment(moment(new Date()).tz(timeZone)).date() ===
          moment(start)
            .tz(timeZone)
            .date()
        ) {
          return 'Today'
        } else if (moment(start).isBefore(oneWeek)) {
          return moment(start)
            .tz(timeZone)
            .format('dddd')
        } else {
          return moment(start)
            .tz(timeZone)
            .format('MMM Do')
        }
      }
    })
  }
})
