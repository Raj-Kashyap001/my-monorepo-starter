"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc } from "../utils/trpc";
import { PropsWithChildren, useState } from "react";
import { httpBatchLink } from "@trpc/react-query/";

export function TrpcLocalProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_TRPC_URL!,
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
