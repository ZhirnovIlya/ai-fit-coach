import { Exercise } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, Play, CheckCircle2 } from 'lucide-react';
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
