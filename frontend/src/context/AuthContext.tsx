import { createContext, useContext } from "react";

export type UserRole = "USER" | "HOST" | "ADMIN";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within AuthContext.Provider");
  }

  return ctx;
};
