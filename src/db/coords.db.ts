import { Schema, Document, model } from 'mongoose'

export interface ICoords extends Document {
  latitude: number
  longitude: number
}

const CoordsSchema: Schema = new Schema(
  {
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  {
    _id: false
  }
)

export default CoordsSchema
