import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "@/types";

interface LoginResult {
  ok: boolean;
  error?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => LoginResult;
  logout: () => void;
}

// Kredensial dummy untuk materi pembelajaran (tanpa backend)
const DUMMY_EMAIL = "lorem@example.com";
const DUMMY_PASSWORD = "lorem123";
const DUMMY_NAMA = "Lorem";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session (in-memory, langsung selesai karena tanpa storage)
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = useCallback(
    (email: string, password: string): LoginResult => {
      const normalizedEmail = email.trim().toLowerCase();

      if (
        normalizedEmail !== DUMMY_EMAIL ||
        password !== DUMMY_PASSWORD
      ) {
        return { ok: false, error: "Email atau password salah" };
      }

      setUser({ nama: DUMMY_NAMA, email: DUMMY_EMAIL });
      return { ok: true };
    },
    []
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
