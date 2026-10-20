import { useAuth } from "@/context/AuthContext";
import { subscribeUnauthorized } from "@/services/api/authSession";
import type { UnauthorizedReason } from "@/types/auth";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthSessionListener() {
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    return subscribeUnauthorized((reason: UnauthorizedReason) => {
      logout();
      router.replace({
        pathname: "/login",
        params: { reason },
      });
    });
  }, [logout, router]);

  return null;
}
