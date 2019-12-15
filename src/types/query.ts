import { queryField } from 'nexus'

export const courts = queryField('courts', {
  type: 'Court',
  list: true,
  resolve: (_, args, { db }) => db.Court.find()
})

export const sessions = queryField('sessions', {
  type: 'Session',
  list: true,
  resolve: (_, args, { db }) =>
    db.Session.find({ end: { $gte: new Date().toISOString() } })
      .populate('createdBy court attending')
      .sort({ start: 'asc' })
})
