import z from 'zod/v4';
import { TodosService } from './todos.service';
import { Input, Mutation, Query, Router } from 'nestjs-trpc';
import type { CreateTodoType, UpdateTodoType } from './todo.schema';
import { todoSchema, createTodoSchema, updateTodoSchema } from './todo.schema';

@Router({ alias: 'todo' })
export class TodoRouter {
  constructor(private readonly todoService: TodosService) {}

  @Query({ input: z.object({ id: z.string() }), output: todoSchema })
  getTodoById(@Input('id') id: string) {
    return this.todoService.getTodoById(id);
  }

  @Query({ output: z.array(todoSchema) })
  getAllTodos() {
    return this.todoService.getAllTodos();
  }

  @Mutation({ input: createTodoSchema, output: todoSchema })
  createTodo(@Input() newTodo: CreateTodoType) {
    return this.todoService.createTodo(newTodo);
  }

  @Mutation({
    input: z.object({ id: z.string(), data: updateTodoSchema }),
    output: todoSchema,
  })
  updateTodo(@Input('id') id: string, @Input('data') data: UpdateTodoType) {
    return this.todoService.updateTodo(id, data);
  }

  @Mutation({ input: z.string(), output: z.boolean() })
  deleteTodo(@Input() id: string) {
    return this.todoService.deleteById(id);
  }
}
