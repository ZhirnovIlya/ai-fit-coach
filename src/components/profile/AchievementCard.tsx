import { Achievement } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Lock } from 'lucide-react';

interface AchievementCardProps {
  achievement: Achievement;
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  const isUnlocked = !!achievement.unlockedAt;
  const hasProgress = achievement.progress !== undefined && achievement.maxProgress !== undefined;
  const progressPercent = hasProgress ? (achievement.progress! / achievement.maxProgress!) * 100 : 0;

  return (
    <div 
      className={cn(
        'rounded-xl border p-4 transition-all',
        isUnlocked ? 'bg-card' : 'bg-muted/30'
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl',
          isUnlocked ? 'bg-accent' : 'bg-muted'
        )}>
          {isUnlocked ? achievement.icon : <Lock className="h-5 w-5 text-muted-foreground" />}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={cn(
            'font-medium',
            !isUnlocked && 'text-muted-foreground'
          )}>
            {achievement.name}
          </h4>
          <p className="text-sm text-muted-foreground truncate">
            {achievement.description}
          </p>

          {hasProgress && !isUnlocked && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Прогресс</span>
                <span className="font-medium">{achievement.progress} / {achievement.maxProgress}</span>
              </div>
              <Progress value={progressPercent} className="h-1.5" />
            </div>
          )}

          {isUnlocked && (
            <p className="text-xs text-muted-foreground mt-1">
              Получено: {new Date(achievement.unlockedAt!).toLocaleDateString('ru-RU')}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
