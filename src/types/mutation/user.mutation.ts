import { mutationField, arg } from 'nexus'
import { AuthorizationError, UpdateUserError, ServerError } from '../../errors'
import { processUpload } from '../../utils'

export const updateUser = mutationField('updateUser', {
  type: 'User',
  args: {
    input: arg({ type: 'UpdateUserInput', required: true })
  },
  resolve: async (_, { input }, { db, request }) => {
    const { userId, avatar, fullName, username } = input
    const { body } = request
    let avatarUrl = undefined
    let updateData = {} as any

    if (body.userId !== userId) {
      throw new AuthorizationError()
    }

    try {
      if (avatar) {
        avatarUrl = await processUpload(avatar)
        updateData.avatarUrl = avatarUrl
      }

      const usernameExists = await db.User.findOne({ username })

      if (usernameExists) {
        throw new UpdateUserError({
          data: {
            username: 'Username is already in use'
          }
        })
      }

      if (username) updateData.username = username

      if (fullName) updateData.fullName = fullName

      const updatedUser = await db.User.findByIdAndUpdate(userId, updateData, {
        new: true
      })

      return updatedUser!
    } catch (error) {
      if (error.data) throw error

      console.error(error)
      throw new ServerError()
    }
  }
})
