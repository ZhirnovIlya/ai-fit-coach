import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
}

interface AuthContextValue extends AuthState {
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const STORAGE_KEY = "ai-fit-coach.auth";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

function getDefaultName(email: string) {
  const fallback = email.split("@")[0]?.trim();
  if (fallback) return fallback.charAt(0).toUpperCase() + fallback.slice(1);
  return "Атлет";
}

function getRandomToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({ user: null, token: null });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthState;
        setState(parsed);
      } catch (error) {
        console.error("Не удалось восстановить сессию", error);
      }
    }
    setLoading(false);
  }, []);

  const persist = (nextState: AuthState) => {
    setState(nextState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextState));
  };

  const login = async (email: string, password: string) => {
    if (!email || !password) return;

    const token = getRandomToken();
    persist({
      user: { email, name: getDefaultName(email) },
      token,
    });
  };

  const register = async (name: string, email: string, password: string) => {
    if (!email || !password) return;

    const token = getRandomToken();
    persist({
      user: { email, name: name.trim() || getDefaultName(email) },
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ user: null, token: null });
  };

  const value = useMemo<AuthContextValue>(() => ({
    ...state,
    loading,
    isAuthenticated: Boolean(state.token && state.user),
    login,
    register,
    logout,
  }), [state, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth должен использоваться внутри AuthProvider");
  }

  return context;
}
