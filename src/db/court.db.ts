import { Schema, Document, model, Model } from 'mongoose'
import { ISession } from './session.db'
import AddressSchema, { IAddress } from './address.db'
import CoordsSchema, { ICoords } from './coords.db'

export interface ICourt extends Document {
  id: string
  name: string
  numberOfCourts: string
  phone: string
  address: IAddress
  coords: ICoords
  type: ('Indoor' | 'Outdoor')[]
  sessions: ISession['_id'][]
}

const CourtSchema: Schema = new Schema({
  name: { type: String, required: true },
  numberOfCourts: { type: String, required: true },
  phone: { type: String, required: true },
  address: AddressSchema,
  coords: CoordsSchema,
  type: { type: [String], enum: ['Indoor', 'Outdoor'] },
  sessions: [{ type: Schema.Types.ObjectId, ref: 'sessions' }]
})

export type CourtModel = Model<ICourt>

export const Court = model<ICourt>('courts', CourtSchema)
