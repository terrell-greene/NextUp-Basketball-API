import { inputObjectType } from 'nexus'

export const CreateCourtInput = inputObjectType({
  name: 'CreateCourtInput',
  description: 'Input type for creating a court',
  definition(t) {
    t.id('suggestedCourtId', { required: true })
    t.string('name', { required: true })
    t.string('address', { required: true })
    t.int('numberOfCourts')
    t.list.field('courtType', { type: 'CourtTypeEnum', required: true })
    t.string('phone')
    t.string('timeZone', { required: true })
  }
})
