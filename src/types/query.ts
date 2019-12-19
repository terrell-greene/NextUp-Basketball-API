import { queryField, arg } from 'nexus'

export const suggestedCourts = queryField('suggestedCourts', {
  type: 'SuggestedCourt',
  list: true,
  resolve: async (_, args, { db }) => db.SuggestedCourt.find()
})

export const courts = queryField('courts', {
  type: 'Court',
  list: true,
  args: {
    where: arg({ type: 'CourtsFilterInput' })
  },
  resolve: (_, { where }, { db }) => {
    if (where) {
      const { latitude, longitude } = where

      return db.Court.find({
        'coords.latitude': { $gte: latitude.gte, $lte: latitude.lte },
        'coords.longitude': { $gte: longitude.gte, $lte: longitude.lte }
      })
    }

    return db.Court.find()
  }
})

export const sessions = queryField('sessions', {
  type: 'Session',
  list: true,
  args: {
    where: arg({ type: 'SessionsFilterInput' })
  },
  resolve: (_, { where }, { db }) => {
    if (where) {
      const { latitude, longitude } = where

      return db.Session.find({
        end: { $gte: new Date().toISOString() },
        'coords.latitude': { $gte: latitude.gte, $lte: latitude.lte },
        'coords.longitude': { $gte: longitude.gte, $lte: longitude.lte }
      })
        .populate('createdBy court attending')
        .sort({ start: 'asc' })
    }

    return db.Session.find({ end: { $gte: new Date().toISOString() } })
      .populate('createdBy court attending')
      .sort({ start: 'asc' })
  }
})
