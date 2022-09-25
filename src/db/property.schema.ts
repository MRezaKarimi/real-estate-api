import { Document, model, Schema } from "mongoose";

export interface IProperty extends Document {
  price: number;
  bed: string;
  bath: string;
  email: string;
  lat: string;
  long: string;
  address: string;
  images: string[];
}

const PropertySchema: Schema = new Schema({
  bed: {
    type: Number,
    required: true,
  },
  bath: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
  },
  long: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
});

export const Property = model<IProperty>("property", PropertySchema);
