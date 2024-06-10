import {z} from "zod";

export const userSignupSchema = z.object({
  username: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_]+$/, 'Username must be alphanumeric and underscores only'),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8).refine((val, ctx) => val === ctx.parent.password, {
    message: 'Passwords do not match',
  }),
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const cardSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    interests: z.array(z.string()),
});

