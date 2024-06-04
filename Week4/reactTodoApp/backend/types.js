const zod = require("zod");

const createTodoSchema = zod.object({
  title: zod.string().min(1),
  description: zod.string().min(1),
});

const updateTodoSchema = zod.object({
  title: zod.string().min(1).optional(),
  description: zod.string().min(1).optional(),
  completed: zod.boolean().optional(), 
});

module.exports = {
  createTodoSchema,
  updateTodoSchema,
};