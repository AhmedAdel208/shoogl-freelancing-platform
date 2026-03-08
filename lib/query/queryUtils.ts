import { useMutation, useQuery, useQueryClient, QueryKey } from "@tanstack/react-query";
import { toast } from "@/common/toast";

// ─── Standard Cache Times ─────────────────────────────────────
export const CACHE_TIMES = {
  // Static data (skills, categories) - 1 hour
  STATIC: {
    staleTime: 1000 * 60 * 60, // 1 hour
    gcTime: 1000 * 60 * 60 * 2, // 2 hours
  },
  // Semi-static data (profile, projects) - 5 minutes
  SEMI_STATIC: {
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  },
  // Dynamic data (freelancers list) - 1 minute
  DYNAMIC: {
    staleTime: 1000 * 60, // 1 minute
    gcTime: 1000 * 60 * 5, // 5 minutes
  },
  // Real-time data (chat, notifications) - no cache
  REALTIME: {
    staleTime: 0,
    gcTime: 1000 * 60, // 1 minute
  },
} as const;

// ─── Centralized Query Keys ───────────────────────────────────
export const QUERY_KEYS = {
  // User/Profile
  profile: () => ["profile"] as const,
  coverImage: (id?: string) => ["cover-image", id] as const,
  userSkills: () => ["user-skills"] as const,
  allSkills: () => ["all-skills"] as const,
  userPortfolios: () => ["user-portfolios"] as const,
  
  // Workers/Freelancers
  freelancers: (params?: Record<string, unknown>) => ["freelancers", params] as const,
  freelancerDetails: (id: string) => ["freelancer", id] as const,
  
  // Projects/Requests
  project: (id: number) => ["project", id] as const,
  projects: () => ["projects"] as const,
  myRequests: () => ["requests", "my-requests"] as const,
  myProposals: () => ["requests", "my-proposals"] as const,
  proposals: (jobRequestId: number) => ["proposals", jobRequestId] as const,
  
  // Chat
  conversations: () => ["chat", "conversations"] as const,
  messages: (conversationId: number) => ["chat", "messages", conversationId] as const,
  onlineUsers: () => ["chat", "online-users"] as const,
  
  // Notifications
  notifications: () => ["notifications"] as const,
  unreadCount: () => ["notifications-unread-count"] as const,
} as const;

// ─── Mutation Factory ─────────────────────────────────────────
interface MutationOptions<TData, TVariables> {
  queryKeysToInvalidate?: QueryKey[];
  successMessage?: string;
  errorMessage?: string;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: Error, variables: TVariables) => void;
}

export function createMutation<TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options: MutationOptions<TData, TVariables> = {}
) {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn,
    onSuccess: (data, variables) => {
      // Invalidate queries
      if (options.queryKeysToInvalidate) {
        options.queryKeysToInvalidate.forEach(key => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      
      // Show success toast
      if (options.successMessage) {
        toast.success(options.successMessage);
      }
      
      // Call custom onSuccess
      options.onSuccess?.(data, variables);
    },
    onError: (error: any, variables) => {
      // Show error toast
      toast.error(options.errorMessage || error?.message || "حدث خطأ");
      
      // Call custom onError
      options.onError?.(error, variables);
    },
  });
}

// ─── Query Factory ────────────────────────────────────────────
interface QueryOptions<TData> {
  queryKey: QueryKey;
  queryFn: () => Promise<TData>;
  enabled?: boolean;
  cacheType?: keyof typeof CACHE_TIMES;
  refetchInterval?: number;
}

export function createQuery<TData>({
  queryKey,
  queryFn,
  enabled = true,
  cacheType = "SEMI_STATIC",
  refetchInterval,
}: QueryOptions<TData>) {
  return useQuery<TData>({
    queryKey,
    queryFn,
    enabled,
    ...CACHE_TIMES[cacheType],
    refetchInterval,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
}
