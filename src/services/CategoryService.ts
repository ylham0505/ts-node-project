import { Category } from "../models/category";
import { CategoryInput } from "../schemas/category.schema";

export class CategoryService {
    async getAllCategories() {
        const categories = await Category.find();
        return categories;
    }

    async getCategoryById(id: string) {
        const category = await Category.findById(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return category;
    }

    async createCategory(data: CategoryInput) {
        const exist = await Category.findOne({ name: data.name });
        if (exist) {
            throw new Error('Category already exists');
        }
        const newCategory = new Category(data);
        await newCategory.save();
        return newCategory;
    }

    async updateCategory(id: string, data: Partial<CategoryInput>) {
        const updateCat = await Category.findByIdAndUpdate(id, { $set: data }, { new: true });
        if (!updateCat) {
            throw new Error('Category not found');
        }
        return updateCat;
    }  
    
    async deleteCategory(id: string) {
        const category = await Category.findByIdAndDelete(id);
        if (!category) {
            throw new Error('Category not found');
        }
        return;
    }
}