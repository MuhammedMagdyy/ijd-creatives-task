import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IJD creative task API',
      version: '1.0.0',
      description: 'API documentation for Orders and Authentication services',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              description: 'User email',
            },
            phone: {
              type: 'string',
              description: 'User phone number',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN'],
              description: 'User role',
            },
            isVerified: {
              type: 'boolean',
              description: 'Verification status',
            },
          },
        },
        UserRegistration: {
          type: 'object',
          required: ['name', 'email', 'password', 'phone'],
          properties: {
            name: {
              type: 'string',
              example: 'Mohamed Magdy',
            },
            email: {
              type: 'string',
              example: 'mohamed@gmail.com',
            },
            password: {
              type: 'string',
              example: 'Password123!',
            },
            phone: {
              type: 'string',
              example: '01100397420',
            },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'mohamed@gmail.com',
            },
            password: {
              type: 'string',
              example: 'Password123!',
            },
          },
        },
        OtpVerification: {
          type: 'object',
          required: ['email', 'otp'],
          properties: {
            email: {
              type: 'string',
              example: 'mohamed@gmail.com',
            },
            otp: {
              type: 'string',
              example: '1234',
            },
          },
        },
        Order: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Order ID',
            },
            userId: {
              type: 'integer',
              description: 'User ID who created the order',
            },
            details: {
              type: 'string',
              description: 'Order details',
            },
            price: {
              type: 'decimal',
              description: 'Order price',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        CreateOrder: {
          type: 'object',
          required: ['details', 'price'],
          properties: {
            details: {
              type: 'string',
              example: 'Testing order',
            },
            price: {
              type: 'decimal',
              example: 1,
            },
          },
        },
        UpdateOrder: {
          type: 'object',
          properties: {
            details: {
              type: 'string',
              example: 'Updated order details',
            },
            price: {
              type: 'decimal',
              example: 2,
            },
          },
        },
        ApiResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Response message',
            },
            data: {
              type: 'object',
              nullable: true,
              description: 'Response data',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Response message',
            },
            data: {
              $ref: '#/components/schemas/User',
            },
            tokens: {
              type: 'object',
              properties: {
                accessToken: {
                  type: 'string',
                  description: 'JWT access token',
                },
                refreshToken: {
                  type: 'string',
                  description: 'JWT refresh token',
                },
              },
            },
          },
        },
        OrdersResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Response message',
            },
            data: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Order',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

export default setupSwagger;
