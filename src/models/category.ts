import mongoose, {Document, Schema} from 'mongoose';
export interface ICategory extends Document {
    name: string;
    name_ru?: string;
    name_en?: string;
    products: mongoose.Types.ObjectId[];
    
}
 
const CategorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true },
    name_ru: { type: String, unique: true },
    name_en: { type: String, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],

}, { timestamps: true },
);

export const Category = mongoose.model<ICategory>('Category', CategorySchema);