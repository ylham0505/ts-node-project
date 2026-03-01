import mongoose, {Document, Schema} from 'mongoose';
export interface IBrand extends Document {
    name: string;
    image?: string;
    
}
 
const BrandSchema: Schema<IBrand> = new Schema({
    name: { type: String, required: true },
    image: { type: String },

}, { timestamps: true },
);

export const Brand = mongoose.model<IBrand>('Brand', BrandSchema);