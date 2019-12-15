import { objectType } from 'nexus'

export const Court = objectType({
  name: 'Court',
  definition(t) {
    t.string('id')
    t.string('name')
    t.string('numberOfCourts')
    t.string('phone')
    t.field('address', {
      type: 'Address'
    })
    t.field('coords', {
      type: 'Coords'
    })
    t.list.field('type', { type: 'CourtType' })
  }
})
