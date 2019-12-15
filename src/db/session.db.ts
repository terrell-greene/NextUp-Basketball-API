import { Schema, Document, model, Model } from 'mongoose'
import { ICourt } from './court.db'
import CoordsSchema, { ICoords } from './coords.db'
import { IUser } from './user.db'

export interface ISession extends Document {
  id: string
  court: ICourt['_id']
  start: Date
  end: Date
  coords: ICoords
  timeZone: string
  createdBy: IUser['_id']
  attending: IUser['_id'][]
}

const SessionSchema: Schema = new Schema({
  court: { type: Schema.Types.ObjectId, ref: 'courts' },
  start: Schema.Types.Date,
  end: Schema.Types.Date,
  coords: CoordsSchema,
  timeZone: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'users' },
  attending: [{ type: Schema.Types.ObjectId, ref: 'users' }]
})

export type SessionModel = Model<ISession>

export const Session = model<ISession>('sessions', SessionSchema)
