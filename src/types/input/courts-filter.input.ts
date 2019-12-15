import { inputObjectType } from 'nexus'

export const CourtsFilterInput = inputObjectType({
  name: 'CourtsFilterInput',
  description: 'Input type for logging in a user',
  definition(t) {
    t.field('latitude', { type: 'CoordsFilterInput', required: true })
    t.field('longitude', { type: 'CoordsFilterInput', required: true })
  }
})
