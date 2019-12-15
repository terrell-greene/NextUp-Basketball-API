import { inputObjectType } from 'nexus/dist'

export const UpdateSessionINput = inputObjectType({
  name: 'UpdateSessionInput',
  description: 'Required input for updating a session',
  definition(t) {
    t.id('sessionId', { required: true })
    t.field('start', { type: 'DateTime' })
    t.field('end', { type: 'DateTime' })
  }
})
