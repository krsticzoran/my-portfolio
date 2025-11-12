"use client";

import { createContext, useContext, useState } from "react";

type UserType = {
  name: string;
  avatar_url?: string;
} | null;

type AuthContextType = {
  user: UserType;
  isAuthenticated: boolean;
  setUser: (user: UserType) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
});

export function AuthProvider({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser: UserType;
}) {
  const [user, setUser] = useState<UserType>(initialUser);

  const value = {
    user,
    isAuthenticated: !!user,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
