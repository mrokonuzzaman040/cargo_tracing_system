import mongoose, { Document, Model, Schema } from "mongoose";

interface ISiteSettings extends Document {
  siteTitle: string;
  siteDescription: string;
}

const SiteSettingsSchema: Schema = new Schema({
  siteTitle: { type: String, required: true },
  siteDescription: { type: String, required: true },
});

const SiteSettings: Model<ISiteSettings> =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
