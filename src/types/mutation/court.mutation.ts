import { mutationField, arg } from 'nexus'

export const suggestCourt = mutationField('suggestCourt', {
  type: 'SuggestedCourt',
  args: {
    input: arg({ type: 'SuggestCourtInput', required: true })
  },
  resolve: async (_, { input }, { db }) => {
    return db.SuggestedCourt.create(input)
  }
})
