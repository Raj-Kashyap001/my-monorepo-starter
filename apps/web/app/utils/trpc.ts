import { AppRouter } from "@repo/trpc/router";
import { CreateTRPCReact, createTRPCReact } from "@trpc/react-query";

export const trpc: CreateTRPCReact<AppRouter, object> = createTRPCReact<
  AppRouter,
  object
>();
