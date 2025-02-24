import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../database/client';
import { IPaginationQuery } from '../interfaces';
import { getPagination } from '../utils';

export class OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.OrderUncheckedCreateInput) {
    return this.prisma.order.create({ data });
  }

  async findOne(query: Prisma.OrderWhereInput) {
    return this.prisma.order.findFirst({ where: query });
  }

  async findAll(options: IPaginationQuery) {
    return await this.prisma.order.findMany({
      ...getPagination(options),
      orderBy: { id: 'desc' },
    });
  }

  async updateOne(
    query: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderUncheckedUpdateInput
  ) {
    return this.prisma.order.update({ where: query, data });
  }

  async deleteOne(query: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.delete({ where: query });
  }
}

export const orderRepository = new OrderRepository(prisma);
