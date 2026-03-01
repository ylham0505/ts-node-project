import { Request, Response } from 'express';
import { CategoryController } from '../CategoryController';
import { CategoryService } from '../../services/CategoryService';
import { Types } from 'mongoose';

jest.mock('../../services/CategoryService');

// ✅ Исправленная helper функция
const createMockCategory = (data: any = {}): any => ({
    _id: data['_id'] ? new Types.ObjectId(data['_id']) : new Types.ObjectId(),
    name: data['name'] || 'Test Category',
    name_ru: data['name_ru'],
    name_en: data['name_en'],
    ...data,
});

describe('CategoryController', () => {
    let categoryController: CategoryController;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnThis();

        mockRequest = {
            params: {},
            body: {},
        };

        mockResponse = {
            status: mockStatus,
            json: mockJson,
        };

        jest.clearAllMocks();
        categoryController = new CategoryController();
    });

    describe('getAllCat', () => {
        test('должен вернуть все категории со статусом 200', async () => {
            const mockCategories = [
                createMockCategory({ 
                    name: 'Electronics',
                    name_ru: 'Электроника',
                    name_en: 'Electronics'
                }),
                createMockCategory({ 
                    name: 'Books',
                    name_ru: 'Книги',
                    name_en: 'Books'
                }),
            ];

            jest.spyOn(CategoryService.prototype, 'getAllCategories')
                .mockResolvedValue(mockCategories);

            await categoryController.getAllCat(mockRequest as Request, mockResponse as Response);

            expect(CategoryService.prototype.getAllCategories).toHaveBeenCalled();
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                categories: mockCategories,
            });
        });

        test('должен вернуть ошибку 500 при сбое сервиса', async () => {
            const errorMessage = 'Database connection failed';
            jest.spyOn(CategoryService.prototype, 'getAllCategories')
                .mockRejectedValue(new Error(errorMessage));

            await categoryController.getAllCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: errorMessage,
            });
        });
    });

    describe('getCatById', () => {
        test('должен вернуть категорию по ID со статусом 200', async () => {
            const mockCategory = createMockCategory({ 
                name: 'Electronics',
                name_ru: 'Электроника'
            });
            mockRequest.params = { id: '1' };
            
            jest.spyOn(CategoryService.prototype, 'getCategoryById')
                .mockResolvedValue(mockCategory);

            await categoryController.getCatById(mockRequest as Request, mockResponse as Response);

            expect(CategoryService.prototype.getCategoryById).toHaveBeenCalledWith('1');
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                category: mockCategory,
            });
        });

        test('должен вернуть 404 если категория не найдена', async () => {
            mockRequest.params = { id: '999' };
            
            jest.spyOn(CategoryService.prototype, 'getCategoryById')
                .mockRejectedValue(new Error('Category not found'));

            await categoryController.getCatById(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Category not found',
            });
        });

        test('должен вернуть 500 при другой ошибке', async () => {
            mockRequest.params = { id: '1' };
            
            jest.spyOn(CategoryService.prototype, 'getCategoryById')
                .mockRejectedValue(new Error('Unexpected error'));

            await categoryController.getCatById(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Unexpected error',
            });
        });
    });

    describe('createCat', () => {
        test('должен создать категорию и вернуть статус 201', async () => {
            const newCategoryData = { 
                name: 'Sports',
                name_ru: 'Спорт',
                name_en: 'Sports'
            };
            const createdCategory = createMockCategory(newCategoryData);
            mockRequest.body = newCategoryData;
            
            jest.spyOn(CategoryService.prototype, 'createCategory')
                .mockResolvedValue(createdCategory);

            await categoryController.createCat(mockRequest as Request, mockResponse as Response);

            expect(CategoryService.prototype.createCategory).toHaveBeenCalledWith(newCategoryData);
            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Category created successfully',
                category: createdCategory,
            });
        });

        test('должен вернуть 409 если категория уже существует', async () => {
            mockRequest.body = { name: 'Electronics' };
            
            jest.spyOn(CategoryService.prototype, 'createCategory')
                .mockRejectedValue(new Error('Category already exists'));

            await categoryController.createCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(409);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Category already exists',
            });
        });

        test('должен вернуть 500 при ошибке сервера', async () => {
            mockRequest.body = { name: 'Sports' };
            
            jest.spyOn(CategoryService.prototype, 'createCategory')
                .mockRejectedValue(new Error('Server error'));

            await categoryController.createCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Server error',
            });
        });

        test('должен создать категорию только с name', async () => {
            const newCategoryData = { name: 'Fashion' };
            const createdCategory = createMockCategory({ name: 'Fashion' });
            mockRequest.body = newCategoryData;
            
            jest.spyOn(CategoryService.prototype, 'createCategory')
                .mockResolvedValue(createdCategory);

            await categoryController.createCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Category created successfully',
                category: expect.objectContaining({
                    name: 'Fashion',
                }),
            });
        });
    });

    describe('updateCat', () => {
        test('должен обновить категорию и вернуть статус 200', async () => {
            const updatedData = { 
                name: 'Updated Electronics',
                name_ru: 'Обновленная электроника'
            };
            const updatedCategory = createMockCategory(updatedData);
            mockRequest.params = { id: '1' };
            mockRequest.body = updatedData;
            
            jest.spyOn(CategoryService.prototype, 'updateCategory')
                .mockResolvedValue(updatedCategory);

            await categoryController.updateCat(mockRequest as Request, mockResponse as Response);

            expect(CategoryService.prototype.updateCategory).toHaveBeenCalledWith('1', updatedData);
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Category updated successfully',
                category: updatedCategory,
            });
        });

        test('должен вернуть 404 если категория не найдена', async () => {
            mockRequest.params = { id: '999' };
            mockRequest.body = { name: 'Updated' };
            
            jest.spyOn(CategoryService.prototype, 'updateCategory')
                .mockRejectedValue(new Error('Category not found'));

            await categoryController.updateCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Category not found',
            });
        });

        test('должен вернуть 500 при ошибке сервера', async () => {
            mockRequest.params = { id: '1' };
            mockRequest.body = { name: 'Updated' };
            
            jest.spyOn(CategoryService.prototype, 'updateCategory')
                .mockRejectedValue(new Error('Database error'));

            await categoryController.updateCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Database error',
            });
        });
    });

    describe('deleteCat', () => {
        test('должен удалить категорию и вернуть статус 200', async () => {
            mockRequest.params = { id: '1' };
            
            jest.spyOn(CategoryService.prototype, 'deleteCategory')
                .mockResolvedValue(undefined as any);

            await categoryController.deleteCat(mockRequest as Request, mockResponse as Response);

            expect(CategoryService.prototype.deleteCategory).toHaveBeenCalledWith('1');
            expect(mockStatus).toHaveBeenCalledWith(200);
            expect(mockJson).toHaveBeenCalledWith({
                message: 'Category deleted successfully',
            });
        });

        test('должен вернуть 404 если категория не найдена', async () => {
            mockRequest.params = { id: '999' };
            
            jest.spyOn(CategoryService.prototype, 'deleteCategory')
                .mockRejectedValue(new Error('Category not found'));

            await categoryController.deleteCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Category not found',
            });
        });

        test('должен вернуть 500 при ошибке сервера', async () => {
            mockRequest.params = { id: '1' };
            
            jest.spyOn(CategoryService.prototype, 'deleteCategory')
                .mockRejectedValue(new Error('Cannot delete'));

            await categoryController.deleteCat(mockRequest as Request, mockResponse as Response);

            expect(mockStatus).toHaveBeenCalledWith(500);
            expect(mockJson).toHaveBeenCalledWith({
                error: 'Cannot delete',
            });
        });
    });
});