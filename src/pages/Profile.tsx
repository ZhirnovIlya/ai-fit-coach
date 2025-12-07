import { Layout } from '@/components/layout/Layout';
import { AchievementCard } from '@/components/profile/AchievementCard';
import { userProfile } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Settings, Watch, Bell, LogOut } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const goalOptions = [
  { value: 'weight_loss', label: 'Похудение' },
  { value: 'muscle_gain', label: 'Набор массы' },
  { value: 'endurance', label: 'Выносливость' },
  { value: 'strength', label: 'Сила' }
];

export default function Profile() {
  const unlockedAchievements = userProfile.achievements.filter(a => a.unlockedAt);
  const inProgressAchievements = userProfile.achievements.filter(a => !a.unlockedAt);

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Профиль</h1>
          <p className="text-muted-foreground">
            Настройки и персональные данные
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Card */}
            <div className="rounded-2xl border bg-card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-energy text-2xl">
                  <User className="h-8 w-8 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userProfile.name}</h2>
                  <p className="text-muted-foreground">
                    Уровень {userProfile.level} · {userProfile.xp} XP
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label>Имя</Label>
                  <Input defaultValue={userProfile.name} className="mt-1" />
                </div>
                <div>
                  <Label>Возраст</Label>
                  <Input type="number" defaultValue={userProfile.age} className="mt-1" />
                </div>
                <div>
                  <Label>Вес (кг)</Label>
                  <Input type="number" defaultValue={userProfile.weight} className="mt-1" />
                </div>
                <div>
                  <Label>Рост (см)</Label>
                  <Input type="number" defaultValue={userProfile.height} className="mt-1" />
                </div>
                <div className="sm:col-span-2">
                  <Label>Цель тренировок</Label>
                  <Select defaultValue={userProfile.goal}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {goalOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                className="mt-6 bg-gradient-energy hover:opacity-90"
                onClick={() => {
                  toast({
                    title: 'Сохранено!',
                    description: 'Ваш профиль успешно обновлён'
                  });
                }}
              >
                Сохранить изменения
              </Button>
            </div>

            {/* Settings */}
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Настройки</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Watch className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Подключить устройства</p>
                    <p className="text-sm text-muted-foreground">Apple Watch, Mi Band, Garmin</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Уведомления</p>
                    <p className="text-sm text-muted-foreground">Напоминания о тренировках</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                    <Settings className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Настройки AI</p>
                    <p className="text-sm text-muted-foreground">Персонализация рекомендаций</p>
                  </div>
                </button>
                <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent text-destructive transition-colors text-left">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10">
                    <LogOut className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Выйти из аккаунта</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="text-lg font-semibold mb-1">Достижения</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {unlockedAchievements.length} из {userProfile.achievements.length} получено
              </p>

              <div className="space-y-3">
                {unlockedAchievements.map((achievement) => (
                  <AchievementCard key={achievement.id} achievement={achievement} />
                ))}
              </div>

              {inProgressAchievements.length > 0 && (
                <>
                  <div className="my-4 border-t" />
                  <p className="text-sm text-muted-foreground mb-3">В процессе</p>
                  <div className="space-y-3">
                    {inProgressAchievements.map((achievement) => (
                      <AchievementCard key={achievement.id} achievement={achievement} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
