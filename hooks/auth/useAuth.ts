import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { isAuthenticated, logout: storeLogout, user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    storeLogout();
    queryClient.clear();
    router.push("/login");
  }, [router, storeLogout, queryClient]);

  return { isAuthenticated, user, isMounted: true, logout };
}
