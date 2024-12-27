import mongoose, { Schema, Document } from 'mongoose';

export interface Asset extends Document {
    name: string;
    type: 'currency' | 'commodity' | 'cryptocurrency' | 'stock' | 'bond';
    symbol: string;
    description: string;
    iconUrl: string;
}

const AssetSchema: Schema = new Schema({
    name: { type: String, required: true },
    enum: ['currency', 'commodity', 'cryptocurrency', 'stock', 'bond'],
    symbol: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, required: true },
});

export default mongoose.models.Asset || mongoose.model<Asset>('Asset', AssetSchema);
