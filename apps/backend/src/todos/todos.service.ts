import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoType, Todo, UpdateTodoType } from './todo.schema';

@Injectable()
export class TodosService {
  private todos: Array<Todo> = [
    {
      id: crypto.randomUUID(),
      name: 'Hello This is First!',
      description: 'What is this?',
      completed: false,
      craetedAt: Date.now().toLocaleString(),
    },
  ];

  public getAllTodos() {
    return this.todos;
  }

  public getTodoById(id: string) {
    return this.todos.find((t: Todo) => t.id === id);
  }

  public createTodo(newTodo: CreateTodoType) {
    const todo: Todo = {
      ...newTodo,
      id: crypto.randomUUID(),
      craetedAt: new Date().toISOString(),
    };
    this.todos.push(todo);
    return todo;
  }

  public updateTodo(id: string, data: UpdateTodoType) {
    const idx = this.todos.findIndex((t: Todo) => t.id === id);
    if (idx === -1) throw new NotFoundException('Todo Not Found!');

    this.todos[idx] = {
      ...this.todos[idx],
      ...data,
    };

    return this.todos[idx];
  }

  public deleteById(id: string) {
    const idx = this.todos.findIndex((t: Todo) => t.id === id);
    if (idx === -1) throw new NotFoundException('Todo Not Found!');

    this.todos.splice(idx, 1);

    return true;
  }
}
