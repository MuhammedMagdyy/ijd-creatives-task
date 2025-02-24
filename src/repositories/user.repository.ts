import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../database/client';

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.UserUncheckedCreateInput) {
    return this.prisma.user.create({ data });
  }

  async findOne(query: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findUnique({ where: query });
  }

  async updateOne(
    query: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUncheckedUpdateInput
  ) {
    return this.prisma.user.update({ where: query, data });
  }
}

export const userRepository = new UserRepository(prisma);
