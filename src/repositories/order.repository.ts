import prisma from '../database/client';
import { Prisma, PrismaClient } from '@prisma/client';

export class OrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOne(data: Prisma.OrderUncheckedCreateInput) {
    return this.prisma.order.create({ data });
  }

  async findOne(query: Prisma.OrderWhereInput) {
    return this.prisma.order.findFirst({ where: query });
  }

  async findAll(pageSize: number, pageNumber: number) {
    return this.prisma.order.findMany({
      take: pageSize,
      skip: (pageNumber - 1) * pageSize,
    });
  }
}

export const orderRepository = new OrderRepository(prisma);
