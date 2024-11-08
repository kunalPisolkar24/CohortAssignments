import { z } from 'zod';


// User Validations 

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});

export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userIdSchema = z.object({
  id: z.number(),
});

// Post Validations
export const createPostSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  tags: z.array(z.string().min(1)),
});

export const updatePostSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  tags: z.array(z.string().min(1)),
});

export const postIdSchema = z.object({
  id: z.number()
});
