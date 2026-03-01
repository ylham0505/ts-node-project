import { Product } from './../models/product';
import { ProductInput } from '../schemas/product.schema';

export class ProductService {
    async getAllProducts() {
        const products = await Product.find();
        return products;
    }

    async getProductById(id: string) {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async createProduct(data: ProductInput) {
        const exist = await Product.findOne({ name: data.name });
        if (exist) {
            throw new Error('Product already exists');
        }
        const newProduct = new Product(data);
        await newProduct.save();
        return newProduct;
    }

    async updateProduct(id: string, data: Partial<ProductInput>) {
        const updatedProduct = await Product.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!updatedProduct) {
            throw new Error('Product not found');
        }
        return updatedProduct;
    }  
    
    async deleteProduct(id: string) {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return;
    }
}