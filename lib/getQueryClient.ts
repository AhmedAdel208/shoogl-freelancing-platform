import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// Create a singleton QueryClient per request using React.cache
// This ensures each server request gets its own QueryClient (no data leaking between users)
// but the same request reuses the same client (deduplication)
const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // On the server, we don't want retries — fail fast
          retry: false,
          // Data prefetched on server is immediately stale on client
          // so React Query refetches in background on mount = always fresh
          staleTime: 0,
        },
      },
    })
);

export default getQueryClient;
