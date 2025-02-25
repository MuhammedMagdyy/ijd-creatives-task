import { Router } from 'express';
import {
  processOrderRequest,
  getPaginatedOrders,
  processPartialOrderUpdate,
  processFullOrderUpdate,
  processOrderDeletion,
} from '../controllers';
import { isAdmin } from '../middlewares';

const router = Router();

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       201:
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *             example:
 *               message: Order created successfully
 *               data:
 *                 id: 21
 *                 userId: 9
 *                 details: Testing order to delete by admin
 *                 price: 1
 *                 createdAt: 2025-02-24T23:31:25.914Z
 *                 updatedAt: 2025-02-24T23:31:25.914Z
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get paginated orders
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: pageNumber
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of orders
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrdersResponse'
 *             example:
 *               message: Orders
 *               data:
 *                 - id: 21
 *                   userId: 9
 *                   details: Testing order to delete by admin
 *                   price: 1
 *                   createdAt: 2025-02-24T23:31:25.914Z
 *                   updatedAt: 2025-02-24T23:31:25.914Z
 *                 - id: 20
 *                   userId: 9
 *                   details: Testing order to delete by admin
 *                   price: 1
 *                   createdAt: 2025-02-24T23:31:25.544Z
 *                   updatedAt: 2025-02-24T23:31:25.544Z
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.route('/').post(processOrderRequest).get(getPaginatedOrders);

/**
 * @swagger
 * /orders/{id}:
 *   patch:
 *     summary: Partially update an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrder'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not your order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Fully update an order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOrder'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Order'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Not your order
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete an order (Admin only)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Order deleted successfully
 *                 data:
 *                   type: null
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden - Admin only
 *       404:
 *         description: Order not found
 *       500:
 *         description: Internal Server Error
 */
router
  .route('/:id')
  .patch(processPartialOrderUpdate)
  .put(processFullOrderUpdate)
  .delete(isAdmin, processOrderDeletion);

export { router as orderRoutes };
