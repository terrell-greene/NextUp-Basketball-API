import { expect } from 'chai'
import gql from 'graphql-tag'
import { request } from 'graphql-request'

import { url } from './utils'

const allSessions = gql`
  query AllSessions {
    sessions {
      id
    }
  }
`

const filteredSessions = gql`
  query FilteredSessions(
    $latitude_lte: Float!
    $latitude_gte: Float!
    $longitude_lte: Float!
    $longitude_gte: Float!
  ) {
    sessions(
      where: {
        latitude: { lte: $latitude_lte, gte: $latitude_gte }
        longitude: { lte: $longitude_lte, gte: $longitude_gte }
      }
    ) {
      id
    }
  }
`

describe('Sessions Query', () => {
  describe('Querying for all sessions', () => {
    it('should return an array of sessions', async () => {
      const { sessions } = await request(url, allSessions)

      expect(sessions).to.be.an('array')
      // expect(sessions).length.to.be.greaterThan(0)
    })
  })

  describe('Querying for sessions by coords', () => {
    it('should return 0 sessions', async () => {
      const variables = {
        latitude_lte: 0,
        latitude_gte: 0,
        longitude_lte: 0,
        longitude_gte: 0
      }

      const { sessions } = await request(url, filteredSessions, variables)

      expect(sessions).to.be.an('array')
      expect(sessions).to.have.length(0)
    })

    it('should return an array of filtered sessions', async () => {
      const variables = {
        latitude_lte: 39.614052,
        latitude_gte: 38.614052,
        longitude_lte: -94.127464,
        longitude_gte: -95.127464
      }
      const { sessions } = await request(url, filteredSessions, variables)

      expect(sessions).to.be.an('array')
      // expect(sessions).length.to.be.greaterThan(0)
    })
  })
})
