import { mutationField, arg } from 'nexus'
import { DeleteSuggestedCourtError, ServerError } from '../../errors'
import * as NodeGeocoder from 'node-geocoder'

const geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.GEOCODE_API_KEY
})

export const suggestCourt = mutationField('suggestCourt', {
  type: 'SuggestedCourt',
  args: {
    input: arg({ type: 'SuggestCourtInput', required: true })
  },
  resolve: async (_, { input }, { db }) => {
    return db.SuggestedCourt.create(input)
  }
})

export const deleteSuggestedCourt = mutationField('deleteSuggestedCourt', {
  type: 'Boolean',
  args: {
    input: arg({ type: 'DeleteSuggestedCourtInput', required: true })
  },
  resolve: async (_, { input }, { db }) => {
    const { suggestedCourtId } = input

    const deletedSuggestedCourt = await db.SuggestedCourt.findByIdAndDelete(
      suggestedCourtId
    )

    if (!deletedSuggestedCourt) {
      throw new DeleteSuggestedCourtError({
        data: { suggestedCourtId: 'No suggested court with that id exists' }
      })
    }
    return true
  }
})

export const createCourt = mutationField('createCourt', {
  type: 'Court',
  args: {
    input: arg({ type: 'CreateCourtInput', required: true })
  },
  resolve: async (_, { input }, { db }) => {
    const {
      suggestedCourtId,
      name,
      address,
      phone,
      numberOfCourts,
      courtType,
      timeZone
    } = input

    try {
      const geoResult = await geocoder.geocode(address)
      const {
        latitude,
        longitude,
        streetNumber,
        streetName,
        city,
        administrativeLevels,
        state,
        zipcode,
        country
      } = geoResult[0]

      const court = await db.Court.create({
        name,
        numberOfCourts,
        phone,
        type: courtType,
        address: {
          streetNumber,
          street: streetName,
          city,
          state: state ? state : administrativeLevels?.level1short,
          zipCode: zipcode,
          country,
          timeZone
        },
        coords: {
          latitude,
          longitude
        }
      })

      await db.SuggestedCourt.findByIdAndDelete(suggestedCourtId)

      return court
    } catch (error) {
      console.error(error)
      throw ServerError()
    }
  }
})
