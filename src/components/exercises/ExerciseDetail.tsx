import { Exercise } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Play, CheckCircle2, Dumbbell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseDetailProps {
  exercise: Exercise;
  onClose: () => void;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20'
};

export function ExerciseDetail({ exercise, onClose }: ExerciseDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-background/80 backdrop-blur-sm p-4 animate-fade-in">
      <div className="w-full max-w-lg rounded-2xl border bg-card shadow-xl animate-scale-in max-h-[90vh] overflow-auto">
        <div className="sticky top-0 bg-card border-b p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">{exercise.nameRu}</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{exercise.muscleGroupRu}</Badge>
            <Badge 
              variant="outline"
              className={cn(difficultyColors[exercise.difficulty])}
            >
              {exercise.difficultyRu}
            </Badge>
          </div>

          <div>
            <h3 className="font-medium mb-2">Описание</h3>
            <p className="text-muted-foreground">{exercise.description}</p>
          </div>

          {(exercise.equipment || exercise.primaryMuscles) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exercise.equipment && (
                <div className="rounded-lg border p-3">
                  <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                    <Dumbbell className="h-4 w-4 text-primary" />
                    Оборудование
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exercise.equipment.map((item) => (
                      <Badge key={item} variant="secondary" className="text-xs">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {exercise.primaryMuscles && (
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-semibold mb-2">Целевые мышцы</div>
                  <div className="flex flex-wrap gap-2">
                    {exercise.primaryMuscles.map((muscle) => (
                      <Badge key={muscle} variant="outline" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                    {exercise.secondaryMuscles?.map((muscle) => (
                      <Badge key={muscle} variant="secondary" className="text-xs">
                        {muscle}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div>
            <h3 className="font-medium mb-3">Ключевые моменты техники</h3>
            <ul className="space-y-2">
              {exercise.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {exercise.aiChecks && (
            <div className="rounded-lg border bg-muted/30 p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Sparkles className="h-4 w-4 text-primary" />
                Что контролирует AI
              </div>
              <div className="flex flex-wrap gap-2">
                {exercise.aiChecks.map((item) => (
                  <Badge key={item} variant="secondary" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button className="w-full gap-2 bg-gradient-energy hover:opacity-90">
              <Play className="h-4 w-4" />
              Начать тренировку с AI-анализом
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
