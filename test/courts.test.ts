import { expect } from 'chai'
import gql from 'graphql-tag'
import { request } from 'graphql-request'

import { url, allCourts } from './utils'

const filteredCourts = gql`
  query FilteredCourts(
    $latitude_lte: Float!
    $latitude_gte: Float!
    $longitude_lte: Float!
    $longitude_gte: Float!
  ) {
    courts(
      where: {
        latitude: { lte: $latitude_lte, gte: $latitude_gte }
        longitude: { lte: $longitude_lte, gte: $longitude_gte }
      }
    ) {
      id
    }
  }
`

describe('Court Query', () => {
  describe('Querying for all courts', () => {
    it('should return an array of courts', async () => {
      const { courts } = await request(url, allCourts)
      expect(courts).to.be.an('array')
      expect(courts).length.to.be.greaterThan(0)
    })
  })

  describe('Querying for courts by coords', () => {
    it('should return 0 courts', async () => {
      const variables = {
        latitude_lte: 0,
        latitude_gte: 0,
        longitude_lte: 0,
        longitude_gte: 0
      }
      const { courts } = await request(url, filteredCourts, variables)

      expect(courts).to.be.an('array')
      expect(courts).to.have.length(0)
    })

    it('should return an array of filtered courts', async () => {
      const variables = {
        latitude_lte: 39.614052,
        latitude_gte: 38.614052,
        longitude_lte: -94.127464,
        longitude_gte: -95.127464
      }
      const { courts } = await request(url, filteredCourts, variables)

      expect(courts).to.be.an('array')
      expect(courts).length.to.be.greaterThan(0)
    })
  })
})
