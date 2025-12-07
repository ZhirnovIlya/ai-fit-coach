import { useMemo, useState } from "react";
import { analyzeTechnique } from "@/lib/ai-engine";
import { useFitnessData } from "@/providers/FitnessDataProvider";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Video, Gauge, Brain, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export function AiTechniqueAnalyzer() {
  const { exercises, saveAiReport } = useFitnessData();
  const formExercises = useMemo(() => exercises.filter((ex) => ex.aiChecks?.length), [exercises]);
  const [selectedId, setSelectedId] = useState(formExercises[0]?.id ?? exercises[0]?.id);
  const [status, setStatus] = useState<"idle" | "capturing" | "analyzing">("idle");
  const [lastScore, setLastScore] = useState<number | null>(null);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [metrics, setMetrics] = useState<{ label: string; value: number; unit?: string; status: "good" | "warn" }[]>([]);

  const currentExercise = useMemo(
    () => exercises.find((ex) => ex.id === selectedId) ?? exercises[0],
    [exercises, selectedId]
  );

  const runAnalysis = () => {
    if (!currentExercise) return;
    setStatus("capturing");

    setTimeout(() => {
      setStatus("analyzing");
      const report = analyzeTechnique(currentExercise);

      saveAiReport({
        exerciseId: currentExercise.id,
        exerciseName: currentExercise.nameRu,
        score: report.score,
        verdict: report.verdict,
        focusAreas: report.focusAreas,
        metrics: report.metrics.map((m) => ({ label: m.label, value: m.value, unit: m.unit, status: m.status })),
        frameCount: report.frameCount,
      });

      setLastScore(report.score);
      setFocusAreas(report.focusAreas);
      setMetrics(report.metrics.map((m) => ({ label: m.label, value: m.value, unit: m.unit, status: m.status })));
      setStatus("idle");
    }, 600);
  };

  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
            <Sparkles className="h-4 w-4" />
            AI-анализ техники
          </div>
          <h2 className="text-xl font-bold mt-3">Видеоаналитика движения</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Модуль оценивает углы в суставах и стабильность корпуса на основе позовых точек.
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <Brain className="h-4 w-4" />
          CV+AI
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Упражнение</label>
          <Select value={selectedId} onValueChange={setSelectedId}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите упражнение" />
            </SelectTrigger>
            <SelectContent>
              {exercises.map((exercise) => (
                <SelectItem key={exercise.id} value={exercise.id}>
                  {exercise.nameRu}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-xl border bg-muted/40 p-4">
          <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
            <Video className="h-4 w-4" />
            AI обрабатывает последовательность позовых точек из камеры/видео и оценивает технику.
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Контроль AI</p>
              <p className="font-semibold">{currentExercise?.aiChecks?.join(', ') || 'Базовые проверки'}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Кадров в сессии</p>
              <p className="font-semibold">60 FPS демо-поток</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            className="flex-1 gap-2 bg-gradient-energy hover:opacity-90"
            onClick={runAnalysis}
            disabled={status !== "idle"}
          >
            <Gauge className="h-4 w-4" />
            {status === "capturing" && 'Снимаем видео...'}
            {status === "analyzing" && 'Анализируем...'}
            {status === "idle" && 'Запустить анализ'}
          </Button>
          <Button variant="outline" className="gap-2" disabled>
            <Video className="h-4 w-4" />
            Стрим с камеры
          </Button>
        </div>

        {lastScore !== null && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Сводный балл</p>
                <p className="text-3xl font-bold">{lastScore} / 100</p>
              </div>
              <div className="w-1/2">
                <Progress value={lastScore} />
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border bg-muted/30 p-3">
                  <div className="flex items-center gap-2 mb-1 text-sm font-medium">
                    {metric.status === "good" ? (
                      <CheckCircle2 className="h-4 w-4 text-success" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-warning" />
                    )}
                    {metric.label}
                  </div>
                  <p className="text-lg font-bold">
                    {metric.value}
                    {metric.unit && <span className="text-sm text-muted-foreground"> {metric.unit}</span>}
                  </p>
                </div>
              ))}
            </div>

            {focusAreas.length > 0 && (
              <div className="rounded-lg border bg-muted/40 p-4">
                <p className="text-sm font-semibold mb-2">Зоны внимания</p>
                <div className="flex flex-wrap gap-2">
                  {focusAreas.map((area) => (
                    <Badge key={area} variant="secondary" className={cn("text-xs", area.includes('колени') && 'bg-warning/20')}>
                      {area}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
