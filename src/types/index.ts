import { decorateType, asNexusMethod } from 'nexus'
import { GraphQLDate, GraphQLDateTime } from 'graphql-iso-date'
import { GraphQLUpload } from 'graphql-upload'

export const GQLDate = decorateType(GraphQLDate, {
  rootTyping: 'Date',
  asNexusMethod: 'date'
})

export const GQLDateTime = decorateType(GraphQLDateTime, {
  rootTyping: 'DateTime',
  asNexusMethod: 'datetime'
})

export const UploadScalar = asNexusMethod(GraphQLUpload, 'upload')

export * from './query'
export * from './model'
export * from './enum'
export * from './input'
export * from './scalar'
