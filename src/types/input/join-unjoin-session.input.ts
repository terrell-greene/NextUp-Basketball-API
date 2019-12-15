import { inputObjectType } from 'nexus/dist'

export const JoinUnjoinSessionInput = inputObjectType({
  name: 'JoinUnjoinSessionInput',
  description: 'Required input for to join/unjoin a session',
  definition(t) {
    t.id('sessionId', { required: true })
  }
})
