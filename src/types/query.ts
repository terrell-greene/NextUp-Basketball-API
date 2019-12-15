import { queryField, arg } from 'nexus'

export const courts = queryField('courts', {
  type: 'Court',
  list: true,
  args: {
    where: arg({ type: 'CourtsFilterInput' })
  },
  resolve: (_, args, { db }) => db.Court.find()
})

export const sessions = queryField('sessions', {
  type: 'Session',
  list: true,
  args: {
    where: arg({ type: 'SessionsFilterInput' })
  },
  resolve: (_, args, { db }) =>
    db.Session.find({ end: { $gte: new Date().toISOString() } })
      .populate('createdBy court attending')
      .sort({ start: 'asc' })
})
