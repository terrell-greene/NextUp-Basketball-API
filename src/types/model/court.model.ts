import { objectType } from 'nexus'

export const Court = objectType({
  name: 'Court',
  definition(t) {
    t.id('id')
    t.string('name')
    t.string('numberOfCourts', { nullable: true })
    t.string('phone', { nullable: true })
    t.field('address', {
      type: 'Address'
    })
    t.field('coords', {
      type: 'Coords'
    })
    t.list.field('type', { type: 'CourtTypeEnum' })
  }
})
