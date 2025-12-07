import { Brain, Dumbbell, Battery, Target } from 'lucide-react';
import { aiRecommendations } from '@/lib/data';
import { cn } from '@/lib/utils';

const icons = {
  workout: Dumbbell,
  recovery: Battery,
  technique: Target
};

const priorityStyles = {
  high: 'border-l-primary bg-accent',
  medium: 'border-l-warning',
  low: 'border-l-muted-foreground'
};

export function AiRecommendations() {
  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-energy">
          <Brain className="h-5 w-5 text-primary-foreground" />
        </div>
        <div>
          <h3 className="text-lg font-semibold">AI-рекомендации</h3>
          <p className="text-sm text-muted-foreground">Персональные советы на сегодня</p>
        </div>
      </div>

      <div className="space-y-3">
        {aiRecommendations.map((rec) => {
          const Icon = icons[rec.type as keyof typeof icons] || Target;
          return (
            <div
              key={rec.id}
              className={cn(
                'rounded-xl border border-l-4 p-4 transition-colors hover:bg-accent/50',
                priorityStyles[rec.priority as keyof typeof priorityStyles]
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="space-y-1">
                  <p className="font-medium">{rec.title}</p>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
