// File: models/FareCost.ts
import mongoose, { Schema, Document, model } from 'mongoose';

interface IFareCost extends Document {
    country: string;
    city: string;
    state: string;
    cost: string;
}

const FareCostSchema: Schema = new Schema({
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    cost: { type: String, required: true },
});

export default mongoose.models.FareCost || model<IFareCost>('FareCost', FareCostSchema);
