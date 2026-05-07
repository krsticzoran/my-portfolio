"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { createBrowserClient } from "@supabase/ssr";

type UserType = {
  name: string;
  avatar_url?: string;
  user_id: string;
} | null;

type AuthContextType = {
  user: UserType;
  isAuthenticated: boolean;
  setUser: (_user: UserType) => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          avatar_url: session.user.user_metadata.avatar_url || null,
          name: session.user.user_metadata.full_name || null,
          user_id: session.user.id,
        });
      }
    });
  }, []);

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
