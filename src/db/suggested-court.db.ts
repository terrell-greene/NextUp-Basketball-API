import { Schema, Document, model, Model } from 'mongoose'

export interface ISuggestedCourt extends Document {
  id: string
  name: string
  street: string
  city: string
  zipCode: string
  state: string
  timeZone: string
}

const SuggestedCourtSchema: Schema = new Schema({
  name: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  zipCode: { type: String, required: true },
  state: { type: String, required: true },
  timeZone: { type: String, required: true }
})

export type SuggestedCourtModel = Model<ISuggestedCourt>

export const SuggestedCourt = model<ISuggestedCourt>(
  'suggestedCourts',
  SuggestedCourtSchema
)
