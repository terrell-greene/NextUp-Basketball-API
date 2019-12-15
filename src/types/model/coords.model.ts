import { objectType } from 'nexus'

export const Coords = objectType({
  name: 'Coords',
  definition(t) {
    t.float('latitude')
    t.float('longitude')
  }
})
