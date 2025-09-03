"use client";

import { trpc } from "../utils/trpc";

const TodoList = () => {
  const { data: todos } = trpc.todo.getAllTodos.useQuery();

  const utils = trpc.useUtils();
  const updateMutation = trpc.todo.updateTodo.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.invalidate();
    },
  });

  const deleteMutation = trpc.todo.deleteTodo.useMutation({
    onSuccess: () => {
      utils.todo.getAllTodos.invalidate();
    },
  });

  function handleCompleted(todoId: string, completed: boolean) {
    updateMutation.mutate({
      id: todoId,
      data: {
        completed: !completed,
      },
    });
  }

  function handleDelete(todoId: string) {
    deleteMutation.mutate(todoId);
  }

  if (!todos) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {todos.map((todo) => {
        return (
          <div
            key={todo.id}
            className="flex items-center justify-between p-4 border-b border-gray-200"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                id={todo.id}
                name={todo.id}
                checked={todo.completed}
                onChange={(e) => handleCompleted(todo.id, todo.completed)}
                className="h-4 w-4 text-green-600 cursor-pointer"
              />
              <label htmlFor={todo.id} className="text-gray-600">
                {todo.name}
              </label>
            </div>

            <button
              className="bg-red-500 text-white p-2 rounded cursor-pointer hover:bg-red-700"
              onClick={() => handleDelete(todo.id)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
