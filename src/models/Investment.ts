import mongoose, { Schema, Document } from 'mongoose';

export interface Investment extends Document {
    portfolioId: mongoose.Schema.Types.ObjectId;
    assetId: mongoose.Schema.Types.ObjectId;
    quantity: number;
    purchasePrice: number;
    createdAt: Date;
}

const InvestmentSchema: Schema = new Schema({
    portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
    quantity: { type: Number, required: true },
    purchasePrice: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Investment || mongoose.model<Investment>('Investment', InvestmentSchema);
