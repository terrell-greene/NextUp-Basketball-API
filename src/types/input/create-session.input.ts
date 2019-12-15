import { inputObjectType } from 'nexus'

export default inputObjectType({
  name: 'CreateSessionInput',
  description: 'Required input for creating a session',
  definition(t) {
    t.id('courtId', { required: true })
    t.field('start', { type: 'DateTime', required: true })
    t.field('end', { type: 'DateTime', required: true })
  }
})
