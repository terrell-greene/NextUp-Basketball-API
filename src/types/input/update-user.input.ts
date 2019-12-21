import { inputObjectType } from 'nexus'

export const UpdateUserInput = inputObjectType({
  name: 'UpdateUserInput',
  description: 'Input for updating a user',
  definition(t) {
    t.id('userId', { required: true })
    t.upload('avatar')
    t.string('fullName')
    t.string('username')
  }
})
