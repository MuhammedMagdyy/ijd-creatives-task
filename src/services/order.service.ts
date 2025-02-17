import { Prisma } from '@prisma/client';
import { orderRepository, OrderRepository } from '../repositories';
import { userService } from './user.service';
import { ApiError } from '../utils';

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOne(details: string, price: number, userId: number) {
    const user = await userService.findOne({ id: userId });

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    const order = this.orderRepository.createOne({ userId, details, price });

    return order;
  }

  async findOne(query: Prisma.OrderWhereInput) {
    return this.orderRepository.findOne(query);
  }

  async findAllWithPagination(pageSize: number, pageNumber: number) {
    return this.orderRepository.findAll(pageSize, pageNumber);
  }
}

export const orderService = new OrderService(orderRepository);
