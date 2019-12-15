import { objectType } from 'nexus'
import { courtAddress } from './utils.model'

export const Address = objectType({
  name: 'Address',
  definition(t) {
    t.string('streetNumber')
    t.string('street')
    t.string('city')
    t.string('zipCode')
    t.string('state')
    t.string('timeZone')
    t.string('country')
    t.field('formattedAddress', {
      type: 'String',
      resolve: async (address, args, ctx) => {
        return courtAddress(address)
      }
    })
  }
})
