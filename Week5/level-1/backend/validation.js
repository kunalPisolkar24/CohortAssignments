import z from "zod";

export const userSignupSchema = z.object({
  username: z
    .string()
    .min(3)
    .max(20)
    .regex(/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric and underscores only"),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

userSignupSchema.superRefine((val, ctx) => {
  if (val.password !== val.confirmPassword) {
    ctx.addIssue({
      code: "custom",
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  }
});

export const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const cardSchema = z.object({
    name: z.string().min(1),
    description: z.string(),
    linkedin: z.string().refine((val) => val === "" || z.string().url().safeParse(val).success, 
                      { message: "Invalid LinkedIn URL" }).optional(),

  twitter: z.string().refine((val) => val === "" || z.string().url().safeParse(val).success, 
                      { message: "Invalid Twitter URL" }).optional(),
    interests: z.array(z.string()),
});

