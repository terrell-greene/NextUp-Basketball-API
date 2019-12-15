import { Schema, Document } from 'mongoose'

export interface IAddress extends Document {
  streetNumber: string
  street: string
  city: string
  zipCode: string
  state: string
  timeZone: string
  country: string
}

const AddressSchema: Schema = new Schema(
  {
    streetNumber: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true },
    state: { type: String, required: true },
    timeZone: { type: String, required: true },
    country: { type: String, required: true }
  },
  {
    _id: false
  }
)

export default AddressSchema
