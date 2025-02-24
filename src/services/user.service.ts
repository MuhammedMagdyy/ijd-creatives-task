import { Prisma } from '@prisma/client';
import { UserRepository, userRepository } from '../repositories';

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createOne(data: Prisma.UserUncheckedCreateInput) {
    return this.userRepository.createOne(data);
  }

  async findOne(query: Prisma.UserWhereUniqueInput) {
    return this.userRepository.findOne(query);
  }

  async updateOne(
    query: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUncheckedUpdateInput
  ) {
    return this.userRepository.updateOne(query, data);
  }
}

export const userService = new UserService(userRepository);
