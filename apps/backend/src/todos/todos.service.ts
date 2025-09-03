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
    console.log('Attempting to delete todo with ID:', id); // ✅ Add debugging
    console.log(
      'Current todos:',
      this.todos.map((t) => t.id),
    ); // ✅ Show current IDs

    const idx = this.todos.findIndex((t: Todo) => t.id === id);
    console.log('Found index:', idx); // ✅ Debug the index

    if (idx === -1) throw new NotFoundException('Todo Not Found!');

    this.todos.splice(idx, 1);
    console.log(
      'Todo deleted successfully. Remaining todos:',
      this.todos.length,
    ); // ✅ Confirm deletion
    return true;
  }
}
