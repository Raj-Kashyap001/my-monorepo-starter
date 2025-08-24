"use client";
import { trpc } from "./utils/trpc";

export default function Home() {
  const { data } = trpc.todo.getAllTodos.useQuery();
  console.log(data);
  return <h1>Hello World</h1>;
}
