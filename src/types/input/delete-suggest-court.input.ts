import { inputObjectType } from 'nexus'

export const DeleteSuggestedCourtInput = inputObjectType({
  name: 'DeleteSuggestedCourtInput',
  description: 'Input type for deleting a suggested court',
  definition(t) {
    t.id('suggestedCourtId', { required: true })
  }
})
