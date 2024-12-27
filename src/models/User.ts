import mongoose, {Schema, Document} from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
    created: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    created: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
