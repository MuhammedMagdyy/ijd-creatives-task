import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, 'name must be at least 3 chars')
    .max(50, 'name must be at most 50 chars')
    .trim(),
  email: z.string().email('Invald email').toLowerCase().trim(),
  password: z.string().min(3, 'Password should be at least 3 chars').trim(),
  phone: z
    .string()
    .regex(/^01[0-2,5]{1}[0-9]{8}$/, { message: 'Invalid phone number' }),
});

export const loginSchema = z.object({
  email: z.string().email('Invald email').toLowerCase().trim(),
  password: z.string().trim(),
});

export const verifyOtpSchema = z.object({
  otp: z.string().trim(),
  email: z.string().email('Invald email').toLowerCase().trim(),
});
