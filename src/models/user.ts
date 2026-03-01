import mongoose, {Document, Schema} from 'mongoose';
import bcrypt from 'bcrypt';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    comparePassword(candidate: string): Promise<boolean>;
}
 
const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, { timestamps: true },
);

UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods['comparePassword'] = async function (this: IUser, candidate: string): Promise<boolean> {
    return bcrypt.compare(candidate, this.password);
}

export const User = mongoose.model<IUser>('User', UserSchema);

 