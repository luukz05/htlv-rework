"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { ApiError, api, type GameResultPayload } from "@/services/api";
import type { AuthUser } from "@/services/types";

type RecordGameResult = <G extends GameResultPayload["game"]>(
  gameId: G,
  body: Omit<Extract<GameResultPayload, { game: G }>, "game">,
) => Promise<{ newAchievements: string[]; xpCapped: boolean }>;

type AuthState = {
  user: AuthUser | null;
  loading: boolean;
  login: (input: { email: string; password: string }) => Promise<void>;
  register: (input: { username: string; email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
  recordGameResult: RecordGameResult;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const { user } = await api.me();
      setUser(user);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setUser(null);
      } else {
        console.warn("auth.refresh failed", err);
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const login = useCallback(async (input: { email: string; password: string }) => {
    const { user } = await api.login(input);
    setUser(user);
  }, []);

  const register = useCallback(async (input: { username: string; email: string; password: string }) => {
    const { user } = await api.register(input);
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
    }
  }, []);

  const recordGameResult = useCallback<RecordGameResult>(
    async (gameId, body) => {
      const response = await api.recordGameResult(gameId, body);
      setUser(response.user);
      return { newAchievements: response.newAchievements, xpCapped: response.xpCapped };
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refresh, recordGameResult }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
