import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { exercises as staticExercises, recentWorkouts, Exercise, WorkoutLog } from "@/lib/data";
import { useAuth } from "./AuthProvider";

export interface AiReport {
  id: string;
  exerciseId: string;
  exerciseName: string;
  score: number;
  verdict: string;
  focusAreas: string[];
  metrics: { label: string; value: number; unit?: string; status: "good" | "warn" }[];
  frameCount?: number;
  timestamp: string;
}

interface FitnessState {
  workoutLogs: WorkoutLog[];
  aiReports: AiReport[];
  favorites: string[];
  exercises: Exercise[];
}

interface FitnessContextValue extends FitnessState {
  addWorkoutLog: (log: Omit<WorkoutLog, "id">) => WorkoutLog;
  saveAiReport: (report: Omit<AiReport, "id" | "timestamp">) => AiReport;
  toggleFavorite: (exerciseId: string) => void;
  resetData: () => void;
}

const DEFAULT_STATE: FitnessState = {
  workoutLogs: recentWorkouts,
  aiReports: [],
  favorites: [],
  exercises: staticExercises,
};

const FitnessContext = createContext<FitnessContextValue | undefined>(undefined);

const STORAGE_KEY = "ai-fit-coach.data";

function getStorageKey(suffix: string) {
  return `${STORAGE_KEY}:${suffix || "guest"}`;
}

function getRandomId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function FitnessDataProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [state, setState] = useState<FitnessState>(DEFAULT_STATE);
  const storageKey = getStorageKey(user?.email ?? "guest");

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as FitnessState;
        setState({ ...DEFAULT_STATE, ...parsed });
      } catch (error) {
        console.error("Не удалось восстановить сохранённые данные", error);
        setState(DEFAULT_STATE);
      }
    } else {
      setState(DEFAULT_STATE);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }, [state, storageKey]);

  const addWorkoutLog: FitnessContextValue["addWorkoutLog"] = (log) => {
    const newLog: WorkoutLog = {
      id: getRandomId(),
      ...log,
    };
    setState((prev) => ({ ...prev, workoutLogs: [newLog, ...prev.workoutLogs] }));
    return newLog;
  };

  const saveAiReport: FitnessContextValue["saveAiReport"] = (report) => {
    const newReport: AiReport = {
      id: getRandomId(),
      timestamp: new Date().toISOString(),
      ...report,
    };
    setState((prev) => ({ ...prev, aiReports: [newReport, ...prev.aiReports].slice(0, 20) }));
    return newReport;
  };

  const toggleFavorite: FitnessContextValue["toggleFavorite"] = (exerciseId) => {
    setState((prev) => {
      const isFavorite = prev.favorites.includes(exerciseId);
      const nextFavorites = isFavorite
        ? prev.favorites.filter((id) => id !== exerciseId)
        : [...prev.favorites, exerciseId];
      return { ...prev, favorites: nextFavorites };
    });
  };

  const resetData = () => setState(DEFAULT_STATE);

  const value = useMemo<FitnessContextValue>(
    () => ({
      ...state,
      addWorkoutLog,
      saveAiReport,
      toggleFavorite,
      resetData,
    }),
    [state]
  );

  return <FitnessContext.Provider value={value}>{children}</FitnessContext.Provider>;
}

export function useFitnessData() {
  const ctx = useContext(FitnessContext);
  if (!ctx) throw new Error("useFitnessData должен использоваться внутри FitnessDataProvider");
  return ctx;
}
