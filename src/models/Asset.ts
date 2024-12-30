import mongoose, { Schema, Document } from 'mongoose';
import {StockType} from "@/types/AssetType";

export interface Asset extends Document {
    name: string;
    type: StockType;
    symbol: string;
    description: string;
    iconUrl: string;
    webUrl: string;
}

const AssetSchema: Schema = new Schema({
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(StockType), default: StockType.STOCK} ,
    symbol: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, required: true },
    webUrl: { type: String, required: true },
});

export default mongoose.models.Asset || mongoose.model<Asset>('Asset', AssetSchema);
