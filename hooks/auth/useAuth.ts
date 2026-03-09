import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { eraseCookie } from "@/utils/cookies";

export function useAuth() {
  const { isAuthenticated, logout: storeLogout, user } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = useCallback(() => {
    storeLogout();
    queryClient.clear();
    eraseCookie("token");
    localStorage.removeItem("token");
    router.push("/login");
  }, [router, storeLogout, queryClient]);

  return { isAuthenticated, user, isMounted: true, logout };
}
