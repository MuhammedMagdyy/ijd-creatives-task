import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { orderService } from '../services';
import { createOrder, paginationSchema } from '../utils';

export const handleOrder = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.id as number;

  const { details, price } = createOrder.parse(req.body);

  const order = await orderService.createOne(details, price, userId);

  res.status(201).json({ message: 'Order created successfully', data: order });
});

export const handleOrderWithPagination = asyncHandler(
  async (req: Request, res: Response) => {
    const { pageSize, pageNumber } = paginationSchema.parse(req.query);

    const orders = await orderService.findAllWithPagination(
      +pageSize as number,
      +pageNumber as number
    );

    res.status(200).json({ message: 'Orders', data: orders });
  }
);
