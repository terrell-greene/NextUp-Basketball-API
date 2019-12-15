import { decorateType } from 'nexus'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'

export const GQLDate = decorateType(GraphQLDate, {
  rootTyping: 'Date',
  asNexusMethod: 'date'
})

export const GQLDateTime = decorateType(GraphQLDateTime, {
  rootTyping: 'DateTime',
  asNexusMethod: 'datetime'
})

export * from './query'
export * from './model'
export * from './enum'
