import mongoose, {Document, Schema} from 'mongoose';
export interface ICategory extends Document {
    name: string;
    name_ru?: string;
    name_en?: string;
    
}
 
const CategorySchema: Schema<ICategory> = new Schema({
    name: { type: String, required: true },
    name_ru: { type: String, unique: true },
    name_en: { type: String, unique: true },

}, { timestamps: true },
);

export const Category = mongoose.model<ICategory>('Category', CategorySchema);