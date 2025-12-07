import { Layout } from '@/components/layout/Layout';
import { WorkoutLogger } from '@/components/workout/WorkoutLogger';
import { AiTechniqueAnalyzer } from '@/components/workout/AiTechniqueAnalyzer';
import { Badge } from '@/components/ui/badge';
import { useFitnessData } from '@/providers/FitnessDataProvider';
import { Brain } from 'lucide-react';

export default function Workout() {
  const { workoutLogs, aiReports } = useFitnessData();

  const totalExercises = workoutLogs.length;
  const totalSets = workoutLogs.reduce((acc, log) => acc + log.sets.length, 0);
  const avgScore = aiReports.length
    ? Math.round(aiReports.reduce((acc, r) => acc + r.score, 0) / aiReports.length)
    : null;

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Тренировка</h1>
          <p className="text-muted-foreground">
            Записывайте упражнения и получайте AI-анализ техники
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Workout Logger */}
          <WorkoutLogger />

          {/* AI Features & history */}
          <div className="space-y-6">
            <AiTechniqueAnalyzer />

            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Быстрая статистика</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-primary">{totalExercises}</p>
                  <p className="text-sm text-muted-foreground">Записанных упражнений</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{totalSets}</p>
                  <p className="text-sm text-muted-foreground">Подходов сохранено</p>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold">{avgScore ?? '—'}</p>
                  <p className="text-sm text-muted-foreground">Средний AI-оценка</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border bg-card p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Последние AI-отчёты</h3>
                <Badge variant="outline" className="gap-2">
                  <Brain className="h-4 w-4" /> {aiReports.length} анализов
                </Badge>
              </div>
              {aiReports.length === 0 && (
                <p className="text-sm text-muted-foreground">Запустите анализ, чтобы получить отчёты по технике.</p>
              )}
              <div className="space-y-3">
                {aiReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="rounded-xl border bg-muted/40 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="text-sm text-muted-foreground">{report.exerciseName}</p>
                        <p className="font-semibold">{report.verdict}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-primary" />
                        <span className="text-lg font-bold">{report.score}</span>
                      </div>
                    </div>
                    {report.focusAreas.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {report.focusAreas.map((area) => (
                          <Badge key={area} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
