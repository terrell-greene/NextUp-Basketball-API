import { objectType } from 'nexus'

export const SuggestedCourt = objectType({
  name: 'SuggestedCourt',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('street')
    t.string('city')
    t.string('zipCode')
    t.string('state')
    t.string('timeZone')
  }
})
