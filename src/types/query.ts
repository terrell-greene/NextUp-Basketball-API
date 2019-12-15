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
    db.Session.find()
      .populate({ path: 'createdBy' })
      .sort({ date: 'asc' })
})
