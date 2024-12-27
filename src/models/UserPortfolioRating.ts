import mongoose, { Schema, Document } from 'mongoose';

export interface UserPortfolioRating extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    portfolioId: mongoose.Schema.Types.ObjectId;
    rating: number;
    comment: string;
    createdAt: Date;
}

const UserPortfolioRatingSchema: Schema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    portfolioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Portfolio', required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserPortfolioRating || mongoose.model<UserPortfolioRating>('UserPortfolioRating', UserPortfolioRatingSchema);
