import { inputObjectType } from 'nexus'

export const CoordsFilterInput = inputObjectType({
  name: 'CoordsFilterInput',
  description: 'Input type for logging in a user',
  definition(t) {
    t.float('lte', { required: true })
    t.float('gte', { required: true })
  }
})
