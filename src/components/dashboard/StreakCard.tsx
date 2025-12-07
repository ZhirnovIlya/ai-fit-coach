import { Flame } from 'lucide-react';
import { userProfile } from '@/lib/data';

export function StreakCard() {
  const xpForNextLevel = (userProfile.level + 1) * 300;
  const xpProgress = (userProfile.xp % 300) / 300 * 100;

  return (
    <div className="rounded-2xl border bg-card p-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-energy animate-pulse-glow">
            <Flame className="h-8 w-8 text-primary-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-background border-2 border-primary text-xs font-bold">
            {userProfile.streak}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl font-bold">{userProfile.streak} дней</span>
            <span className="text-muted-foreground">подряд</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Не сбавляйте темп! Ваш рекорд — 14 дней
          </p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Уровень</span>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {userProfile.level}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            {userProfile.xp % 300} / 300 XP
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div 
            className="h-full bg-gradient-energy transition-all duration-500"
            style={{ width: `${xpProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
