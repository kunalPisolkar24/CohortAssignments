import zod from "zod";

export const createTodoSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

export const updateTodoSchema = zod.object({
  title: zod.string().min(1).optional(),
  description: zod.string().min(1).optional(),
  completed: zod.boolean().optional(), 
});


export type CreateTodoSchema = zod.infer<typeof createTodoSchema>;
export type UpdateTodoSchema = zod.infer<typeof updateTodoSchema>;