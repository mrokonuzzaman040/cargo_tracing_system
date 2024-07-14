import mongoose, { Document, Model, Schema } from "mongoose";

interface ICountry extends Document {
  name: string;
}

const CountrySchema: Schema = new Schema({
  name: { type: String, required: true },
});

const Country: Model<ICountry> =
  mongoose.models.Country || mongoose.model("Country", CountrySchema);

export default Country;
