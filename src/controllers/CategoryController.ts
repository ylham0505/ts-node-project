import { Request, Response } from "express";
import { CategoryService } from "../services/CategoryService";



const categoryService = new CategoryService();

export class CategoryController {
    getAllCat = async(_req: Request, res: Response) => {
        try {
            const categories = await categoryService.getAllCategories()
            return res.status(200).json({
                categories
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    getCatById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await categoryService.getCategoryById(id!);
            return res.status(200).json({
                category
            });
        } catch (error: any) {
            if (error.message === 'Category not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    createCat = async (req: Request, res: Response) => {
        try {
            const category = await categoryService.createCategory(req.body);
            return res.status(201).json({
                message: 'Category created successfully',
                category
            });
        } catch (error: any) {
            if (error.message === 'Category already exists') {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    updateCat = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const category = await categoryService.updateCategory(id!, req.body);
            return res.status(200).json({ message: 'Category updated successfully', category });
        } catch (error: any) {
            if (error.message === 'Category not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    deleteCat = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await categoryService.deleteCategory(id!);
            return res.status(200).json({ message: 'Category deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Category not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }
}