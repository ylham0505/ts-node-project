import { Request, Response } from "express";
import { BrandService } from "../services/BrandService";



const brandService = new BrandService();

export class BrandController {
    getAllBrands = async(_req: Request, res: Response) => {
        try {
            const brands = await brandService.getAllBrands()
            return res.status(200).json({
                brands
            });
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    getBrandById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const brand = await brandService.getBrandById(id!);
            return res.status(200).json({
                brand
            });
        } catch (error: any) {
            if (error.message === 'Brand not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    createBrand = async (req: Request, res: Response) => {
        try {
            const brand = await brandService.createBrand(req.body);
            return res.status(201).json({
                message: 'Brand created successfully',
                brand
            });
        } catch (error: any) {
            if (error.message === 'Brand already exists') {
                return res.status(409).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    updateBrand = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const brand = await brandService.updateBrand(id!, req.body);
            return res.status(200).json({ message: 'Brand updated successfully', brand });
        } catch (error: any) {
            if (error.message === 'Brand not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    deleteBrand = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await brandService.deleteBrand(id!);
            return res.status(200).json({ message: 'Brand deleted successfully' });
        } catch (error: any) {
            if (error.message === 'Brand not found') {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }
}