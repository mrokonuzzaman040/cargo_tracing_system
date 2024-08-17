import mongoose, { Document, Model, Schema } from "mongoose";

interface ICity extends Document {
  name: string;
  country: string;
}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
});

const City: Model<ICity> =
  mongoose.models.City || mongoose.model("City", CitySchema);

export default City;
