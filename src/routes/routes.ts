import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../schemas/user.schema";
import { CategoryController } from "../controllers/CategoryController";
import { categoryIdSchema, categorySchema, updateCategorySchema } from "../schemas/category.schema";
import { BrandController } from "../controllers/BrandController";
import { brandIdSchema, brandSchema, updateBrandSchema } from "../schemas/brand.schema";
import { ProductController } from "../controllers/ProductController";
import { productIdSchema, productSchema, updateProductSchema } from "../schemas/product.schema";
import { AuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();
const userController = new UserController();
const categoryController = new CategoryController();
const brandController = new BrandController();
const productController = new ProductController();


router.post('/register', validate(registerSchema), userController.register);

router.post('/login', userController.login);

//category
router.get('/categories', categoryController.getAllCat);
router.get('/categories/:id', validate(categoryIdSchema), categoryController.getCatById);
router.post('/categories', AuthMiddleware, validate(categorySchema), categoryController.createCat);
router.put('/categories/:id', AuthMiddleware, validate(categoryIdSchema.and(updateCategorySchema)), categoryController.updateCat);
router.delete('/categories/:id', AuthMiddleware, validate(categoryIdSchema), categoryController.deleteCat);

//brand
router.get('/brands', brandController.getAllBrands);
router.get('/brands/:id', validate(brandIdSchema), brandController.getBrandById);
router.post('/brands', AuthMiddleware, validate(brandSchema), brandController.createBrand);
router.put('/brands/:id', AuthMiddleware, validate(brandIdSchema.and(updateBrandSchema)), brandController.updateBrand);
router.delete('/brands/:id', AuthMiddleware, validate(brandIdSchema), brandController.deleteBrand);

//product
router.get('/products', productController.getAllProducts);
router.get('/products/:id', validate(productIdSchema), productController.getProductById);
router.post('/products', AuthMiddleware, validate(productSchema), productController.createProduct);
router.put('/products/:id', AuthMiddleware, validate(productIdSchema.and(updateProductSchema)), productController.updateProduct);
router.delete('/products/:id', AuthMiddleware, validate(productIdSchema), productController.deleteProduct);

export default router;

