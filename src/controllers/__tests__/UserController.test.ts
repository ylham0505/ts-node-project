import { Request, Response } from 'express';
import { UserController } from '../UserConntroller';
import { UserService } from '../../services/UserService';
import { Types } from 'mongoose';
jest.mock('../../services/UserService');

const createMockRegister = (data: any = {}): any => ({
  _id: data['_id'] ? new Types.ObjectId(data['_id']) : new Types.ObjectId(),
  name: data['name'] || 'Test Category',
  email: data['email'] || 'test@example.com',
  password: data['password'] || 'testpassword',
  role: data['role'] || 'user',
  ...data,
});

describe('UserController', () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  // Это выполнится перед каждым тестом
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
    userController = new UserController();
  });

  // Наш первый тест!
  describe('register', () => {
    test('register должен вернуть статус 201 при успехе', async () => {
      const newRegisterData = {
        id: 'demim26rf26r2f6',
        name: 'Иван',
        email: 'ivan@example.com',
        role: 'user'
      };
      const createdRegister = createMockRegister(newRegisterData);
      mockRequest.body = newRegisterData;
      jest.spyOn(UserService.prototype, 'register')
        .mockResolvedValue(createdRegister);


      // 3. Вызываем метод который тестируем
      await userController.register(mockRequest as Request, mockResponse as Response);

      // 4. Проверяем результат
      expect(UserService.prototype.register).toHaveBeenCalledWith(newRegisterData);
      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: {
          id: createdRegister._id,
          name: 'Иван',
          email: 'ivan@example.com',
          role: 'user'
        }
      });
    });
  })
  test('register должен вернуть 409 если user уже существует', async () => {
    mockRequest.body = { name: 'Иван' };

    jest.spyOn(UserService.prototype, 'register')
      .mockRejectedValue(new Error('User already exists'));
    // 3. Вызываем метод который тестируем
    await userController.register(mockRequest as Request, mockResponse as Response);

    // 4. Проверяем результат
    expect(mockStatus).toHaveBeenCalledWith(409);
    expect(mockJson).toHaveBeenCalledWith({
      error: 'User already exists',
    });
  });

});