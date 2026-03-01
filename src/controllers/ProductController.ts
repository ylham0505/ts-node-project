import { ProductService } from './../services/ProductService';
import { Request, Response } from "express";



const productService = new ProductService();

export class ProductController {
    getAllProducts = async(_req: Request, res: Response) => {
        try {
            const products = await productService.getAllProducts()
            return res.status(200).json({
                products
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    getProductById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await productService.getProductById(id!);
            return res.status(200).json({
                product
            });
        } catch (error: any) {
            if (error.message === 'Product not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    createProduct = async (req: Request, res: Response) => {
        try {
            const product = await productService.createProduct(req.body);
            return res.status(201).json({
                message: 'Product created successfully',
                product
            });
        } catch (error: any) {
            if (error.message === 'Product already exists') {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    updateProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const product = await productService.updateProduct(id!, req.body);
            return res.status(200).json({ message: 'Product updated successfully', product });
        } catch (error: any) {
            if (error.message === 'Product not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    deleteProduct = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await productService.deleteProduct(id!);
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Product not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }
}