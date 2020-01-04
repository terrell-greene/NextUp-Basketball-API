import { enumType } from 'nexus'

export const CourtType = enumType({
  description: 'Different types of available courts',
  name: 'CourtTypeEnum',
  members: ['Indoor', 'Outdoor']
})
