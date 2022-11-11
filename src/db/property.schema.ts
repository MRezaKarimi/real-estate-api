import { Document, model, Schema } from "mongoose";

export interface IProperty extends Document {
  price: number;
  bed: string;
  bath: string;
  email: string;
  lat: number;
  long: number;
  address: string;
  city: string;
  images: object;
}

const PropertySchema: Schema = new Schema({
  bed: {
    type: Number,
    required: [true, "bed is required"],
  },
  bath: {
    type: Number,
    required: [true, "bath is required"],
  },
  area: {
    type: Number,
    required: [true, "area is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  lat: {
    type: Number,
    required: [true, "lat is required"],
  },
  long: {
    type: Number,
    required: [true, "long is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  images: {
    type: Object,
    required: [true, "images is required"],
  },
});

export const Property = model<IProperty>("property", PropertySchema);
