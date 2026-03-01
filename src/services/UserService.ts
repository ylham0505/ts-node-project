import { User } from '../models/user';
import { RegisterInput } from '../schemas/user.schema';

export class UserService {
    async register(data: RegisterInput) {
        const exist = await User.findOne({name: data.name});
        if (exist) {
            throw new Error('User already exists');
        }
        const newUser = new User({
            name: data.name,
            password: data.password,
            email: data.email,
        });
        await newUser.save();
        return newUser;
    }

    async login(data: {name: string; password: string; email: string}) {
        const user = await User.findOne({email: data.email});
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await user.comparePassword(data.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        return user;
    }

    async getById(id: string) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}