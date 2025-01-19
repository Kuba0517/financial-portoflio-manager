import mongoose, {Schema, Document} from 'mongoose';
import {UserRole} from "@/types/UserRoles";

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    description: string;
    role: UserRole;
    createdAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, default: "Hello, I am new here!" },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || mongoose.model<User>('User', UserSchema);
