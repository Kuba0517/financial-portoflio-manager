import mongoose, { Schema, Document } from 'mongoose';

export interface Portfolio extends Document {
    name: string;
    createdAt: Date;
    user: mongoose.Schema.Types.ObjectId;
}

const PortfolioSchema: Schema = new Schema({
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Portfolio || mongoose.model<Portfolio>('Portfolio', PortfolioSchema);
