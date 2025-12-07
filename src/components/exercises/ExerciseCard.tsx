import { Exercise } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExerciseCardProps {
  exercise: Exercise;
  onClick?: () => void;
}

const difficultyColors = {
  beginner: 'bg-success/10 text-success border-success/20',
  intermediate: 'bg-warning/10 text-warning border-warning/20',
  advanced: 'bg-destructive/10 text-destructive border-destructive/20'
};

const muscleIcons: Record<string, string> = {
  legs: '🦵',
  chest: '💪',
  back: '🔙',
  shoulders: '🎯',
  arms: '💪',
  core: '🔥'
};

export function ExerciseCard({ exercise, onClick }: ExerciseCardProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-lg group"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent text-2xl">
          {muscleIcons[exercise.muscleGroup] || '💪'}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold truncate">{exercise.nameRu}</h3>
              <p className="text-sm text-muted-foreground">{exercise.name}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 transition-transform group-hover:translate-x-1" />
          </div>

          <div className="flex items-center gap-2 mt-3">
            <Badge variant="outline" className="text-xs">
              {exercise.muscleGroupRu}
            </Badge>
            <Badge 
              variant="outline" 
              className={cn('text-xs', difficultyColors[exercise.difficulty])}
            >
              {exercise.difficultyRu}
            </Badge>
          </div>
        </div>
      </div>
    </button>
  );
}
