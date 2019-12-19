import { inputObjectType } from 'nexus'

export const SuggestCourtInput = inputObjectType({
  name: 'SuggestCourtInput',
  description: 'Input type for suggesting a court',
  definition(t) {
    t.string('name', { required: true })
    t.string('street', { required: true })
    t.string('city', { required: true })
    t.string('state', { required: true })
    t.string('zipCode', { required: true })
  }
})
