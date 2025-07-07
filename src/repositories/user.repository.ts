import { UserModel, IUser } from '../models/user.model';

export class UserRepository {
  async create(user: Partial<IUser>): Promise<IUser> {
    return UserModel.create(user);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).exec();
  }

  async findAll(): Promise<IUser[]> {
    return UserModel.find().exec();
  }
}