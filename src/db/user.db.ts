import { Schema, Document, model, Model } from 'mongoose'
import { ISession } from './session.db'

export interface IUser extends Document {
  id: string
  role: 'USER' | 'DEVELOPER'
  username: string
  avatartUrl?: string
  fullName: string
  password: string
  createdSessions: ISession['_id'][]
  attendingSessions: ISession['_id'][]
}

const UserSchema: Schema = new Schema({
  role: {
    type: String,
    required: true,
    enum: ['USER', 'DEVELOPER'],
    default: 'USER'
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  fullName: { type: String, required: true },
  avatarUrl: { type: String },
  password: { type: String, required: true },
  createdSessions: [{ type: Schema.Types.ObjectId, ref: 'sessions' }],
  attendingSessions: [{ type: Schema.Types.ObjectId, ref: 'sessions' }]
})

export type UserModel = Model<IUser>

export const User = model<IUser>('users', UserSchema)
