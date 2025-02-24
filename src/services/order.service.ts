import { Prisma } from '@prisma/client';
import { orderRepository, OrderRepository } from '../repositories';
import { userService } from '../services';
import { ApiError } from '../utils';
import { IPaginationQuery } from '../interfaces';

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

  async retrieveOrdersWithPagination(options: IPaginationQuery) {
    return this.orderRepository.findAll(options);
  }

  async updateOne(
    query: Prisma.OrderWhereUniqueInput,
    data: Prisma.OrderUncheckedUpdateInput
  ) {
    return this.orderRepository.updateOne(query, data);
  }

  async updateOrderById(
    orderId: number,
    userId: number,
    details?: string,
    price?: number
  ) {
    const user = await userService.findOne({ id: userId });

    if (!user) {
      throw new ApiError('User not found', 404);
    }

    const order = await this.orderRepository.findOne({ id: orderId });

    if (!order) {
      throw new ApiError('Order not found', 404);
    }

    if (order.userId !== userId) {
      throw new ApiError('You are not authorized to update this order', 403);
    }

    const updateData: Partial<{ details: string; price: number }> = {};

    if (details) updateData.details = details;
    if (price) updateData.price = price;
    if (!Object.keys(updateData).length) {
      throw new ApiError('No valid fields provided for update', 400);
    }

    return this.orderRepository.updateOne({ id: orderId }, updateData);
  }

  async deleteOne(query: Prisma.OrderWhereUniqueInput) {
    return this.orderRepository.deleteOne(query);
  }

  async deleteOrderById(orderId: number) {
    const order = await this.orderRepository.findOne({ id: orderId });

    if (!order) {
      throw new ApiError('Order not found', 404);
    }

    return this.orderRepository.deleteOne({ id: orderId });
  }
}

export const orderService = new OrderService(orderRepository);
