import z from 'zod/v4';

export const todoSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  completed: z.boolean(),
  craetedAt: z.string(),
  dueDate: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).optional(),
});

export const createTodoSchema = todoSchema.omit({
  id: true,
  craetedAt: true,
});

export const updateTodoSchema = todoSchema.partial();

export type CreateTodoType = z.infer<typeof createTodoSchema>;
export type UpdateTodoType = z.infer<typeof updateTodoSchema>;
export type Todo = z.infer<typeof todoSchema>;
