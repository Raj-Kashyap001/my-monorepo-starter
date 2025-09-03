"use client";

import { useState } from "react";
import { trpc } from "../utils/trpc";

const CreateTodo = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string>("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("LOW");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const utils = trpc.useUtils();

  const mutaion = trpc.todo.createTodo.useMutation({
    onSuccess: () => {
      setName("");
      setDescription("");
      setCompleted(false);
      setDueDate("");
      setPriority("LOW");
      setSuccessMessage("Todo created successfully!");
      utils.todo.getAllTodos.invalidate();
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;
    mutaion.mutate({
      name,
      description,
      completed,
      dueDate,
      priority,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl p-6 shadow-lg rounded-lg bg-white mx-auto"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        Create A Todo
      </h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded resize-none"
      />
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="completed"
          name="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 text-green-600 cursor-pointer"
        />
        <label htmlFor="completed" className="text-gray-600">
          Completed
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <label className="text-gray-600 w-32">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <select
        name="priority"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
        }
        className="w-full p-2 border border-gray-100 rounded"
        id="priority"
      >
        <option className="text-gray-600" value="" defaultValue={""}>
          Priority (Optional)
        </option>
        <option className="text-gray-600" value="LOW">
          Low
        </option>
        <option className="text-gray-600" value="MEDIUM">
          Medium
        </option>
        <option className="text-gray-600" value="HIGH">
          High
        </option>
      </select>

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {successMessage}
        </div>
      )}

      <button
        className="bg-blue-500 text-white p-2 rounded cursor-pointer hover:bg-blue-700"
        type="submit"
        disabled={mutaion.isPending}
      >
        {mutaion.isPending ? "Creating..." : "Create"}
      </button>
    </form>
  );
};

export default CreateTodo;
