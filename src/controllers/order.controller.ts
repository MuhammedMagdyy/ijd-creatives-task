import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { orderService } from '../services';
import {
  orderDetailsSchema,
  paginationSchema,
  orderPatchSchema,
  paramsSchema,
} from '../utils';

export const processOrderRequest = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user?.id as number;

    const { details, price } = orderDetailsSchema.parse(req.body);

    const order = await orderService.createOne(details, price, userId);

    res
      .status(201)
      .json({ message: 'Order created successfully', data: order });
  }
);

export const getPaginatedOrders = asyncHandler(
  async (req: Request, res: Response) => {
    const { pageNumber, pageSize } = paginationSchema.parse(req.query);

    const orders = await orderService.retrieveOrdersWithPagination({
      pageNumber,
      pageSize,
    });

    res
      .status(200)
      .json({ message: 'Orders retrieved successfully', data: orders });
  }
);

export const processFullOrderUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: orderId } = paramsSchema.parse(req.params);
    const { id: userId } = paramsSchema.parse(req.user);

    const { details, price } = orderDetailsSchema.parse(req.body);

    const order = await orderService.updateOrderById(
      orderId,
      userId,
      details,
      price
    );

    res
      .status(200)
      .json({ message: 'Order updated successfully', data: order });
  }
);

export const processPartialOrderUpdate = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: orderId } = paramsSchema.parse(req.params);
    const { id: userId } = paramsSchema.parse(req.user);

    const { details, price } = orderPatchSchema.parse(req.body);

    const order = await orderService.updateOrderById(
      orderId,
      userId,
      details,
      price
    );

    res
      .status(200)
      .json({ message: 'Order partially updated successfully', data: order });
  }
);

export const processOrderDeletion = asyncHandler(
  async (req: Request, res: Response) => {
    const { id: orderId } = paramsSchema.parse(req.params);

    await orderService.deleteOrderById(orderId);

    res.status(204).send();
  }
);
