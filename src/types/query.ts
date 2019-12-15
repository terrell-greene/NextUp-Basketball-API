import { queryField } from 'nexus'

export const courts = queryField('courts', {
  type: 'Court',
  list: true,

  resolve: (_, args, { db }) => db.Court.find()
})
