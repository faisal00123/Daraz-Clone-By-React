import { z } from 'zod';
export type LoginValidationType = z.infer<typeof LoginValidation>;
export const LoginValidation = z.object({
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
export type SignUpValidationType = z.infer<typeof SignUpValidation>;
export const SignUpValidation = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "password doesn't match",
    path: ['confirmPassword'],
  });

export type AuthCheckType = z.infer<typeof AuthCheck>;
export const AuthCheck = z.object({
  email: z.email(),
  password: z.string(),
});
