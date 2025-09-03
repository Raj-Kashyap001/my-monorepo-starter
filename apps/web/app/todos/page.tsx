import CreateTodo from "./CreateTodo";
import TodoList from "./TodoList";

export default function TodoPage() {
  return (
    <div className="space-y-4 max-w-2xl p-6 shadow-lg rounded-lg bg-white mx-auto">
      <CreateTodo />
      <TodoList />
    </div>
  );
}
