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
    required: [true, "bed is required"],
  },
  bath: {
    type: Number,
    required: [true, "bath is required"],
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
    type: String,
    required: [true, "lat is required"],
  },
  long: {
    type: String,
    required: [true, "long is required"],
  },
  address: {
    type: String,
    required: [true, "address is required"],
  },
  images: {
    type: [String],
    required: [true, "images is required"],
  },
});

export const Property = model<IProperty>("property", PropertySchema);
