import { Brand } from "../models/brand";
import { BrandInput } from "../schemas/brand.schema";

export class BrandService {
    async getAllBrands() {
        const brands = await Brand.find();
        return brands;
    }

    async getBrandById(id: string) {
        const brand = await Brand.findById(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        return brand;
    }

    async createBrand(data: BrandInput) {
        const exist = await Brand.findOne({ name: data.name });
        if (exist) {
            throw new Error('Brand already exists');
        }
        const newBrand = new Brand(data);
        await newBrand.save();
        return newBrand;
    }

    async updateBrand(id: string, data: Partial<BrandInput>) {
        const updateBrand = await Brand.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!updateBrand) {
            throw new Error('Brand not found');
        }
        return updateBrand;
    }  
    
    async deleteBrand(id: string) {
        const brand = await Brand.findByIdAndDelete(id);
        if (!brand) {
            throw new Error('Brand not found');
        }
        return;
    }
}