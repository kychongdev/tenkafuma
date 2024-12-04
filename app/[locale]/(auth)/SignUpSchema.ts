import { z } from 'zod';

export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Wrong format email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
