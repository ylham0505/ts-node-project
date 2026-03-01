import mongoose, {Document, Schema} from 'mongoose';
export interface IProduct extends Document {
    name: string;
    name_ru?: string;
    name_en?: string;
    image?: string;
    stock: number;
    price: number;
    description?: string;
    category_id: mongoose.Types.ObjectId;
    
}
 
const ProductSchema: Schema<IProduct> = new Schema({
    name: { type: String, required: true },
    name_ru: { type: String, unique: true, sparse: true },
    name_en: { type: String, unique: true, sparse: true },
    image: { type: String },
    stock: { type: Number, required: true},
    price: { type: Number, required: true},
    description: { type: String},
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true}

}, { timestamps: true },
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);