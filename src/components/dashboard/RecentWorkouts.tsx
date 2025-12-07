import { recentWorkouts, exercises } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export function RecentWorkouts() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Последние тренировки</h3>
        <p className="text-sm text-muted-foreground">Ваша недавняя активность</p>
      </div>

      <div className="space-y-4">
        {recentWorkouts.slice(0, 3).map((workout) => {
          const exercise = exercises.find(e => e.id === workout.exerciseId);
          if (!exercise) return null;

          const totalWeight = workout.sets.reduce((acc, set) => acc + set.weight * set.reps, 0);
          const totalSets = workout.sets.length;
          const totalReps = workout.sets.reduce((acc, set) => acc + set.reps, 0);

          return (
            <div 
              key={workout.id}
              className="rounded-xl border p-4 transition-colors hover:bg-accent/30"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium">{exercise.nameRu}</h4>
                  <p className="text-sm text-muted-foreground">
                    {totalSets} подходов · {totalReps} повторений · {totalWeight} кг
                  </p>
                </div>
                <Badge variant={workout.aiScore && workout.aiScore >= 90 ? 'default' : 'secondary'}>
                  AI: {workout.aiScore}%
                </Badge>
              </div>

              {workout.aiScore && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Оценка техники</span>
                    <span className="font-medium">{workout.aiScore}%</span>
                  </div>
                  <Progress value={workout.aiScore} className="h-2" />
                </div>
              )}

              {workout.aiTips && workout.aiTips.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground mb-1">Советы AI:</p>
                  <p className="text-sm">{workout.aiTips[0]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
