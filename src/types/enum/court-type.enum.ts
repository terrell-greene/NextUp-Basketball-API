import { enumType } from 'nexus'

export const CourtType = enumType({
  description: 'Different types of available courts',
  name: 'CourtType',
  members: ['Indoor', 'Outdoor']
})
