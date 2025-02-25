import { Router } from 'express';
import {
  processUserLogin,
  processUserRegistration,
  processOtpVerification,
} from '../controllers';

const router = Router();
/**
 * @swagger
 * tags:
 *   - name: Authentication
 *     description: User authentication endpoints
 *   - name: Orders
 *     description: Order management endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully, please verify your email
 *                 data:
 *                   type: null
 *       400:
 *         description: Bad request
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal Server Error
 */
router.post('/register', processUserRegistration);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *             example:
 *               message: Logged in successfully
 *               data:
 *                 id: 9
 *                 name: Mohamed Magdy
 *                 email: mohamed@gmail.com
 *                 phone: 01100397420
 *                 role: USER
 *                 isVerified: true
 *               tokens:
 *                 accessToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', processUserLogin);
/**
 * @swagger
 * /auth/verify-otp:
 *   post:
 *     summary: Verify user with OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OtpVerification'
 *     responses:
 *       200:
 *         description: User verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User verified successfully
 *                 data:
 *                   type: null
 *       400:
 *         description: Bad request
 *       401:
 *         description: Invalid OTP
 *       500:
 *         description: Internal Server Error
 */
router.post('/verify-otp', processOtpVerification);

export { router as authRoutes };
