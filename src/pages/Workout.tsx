import { Layout } from '@/components/layout/Layout';
import { WorkoutLogger } from '@/components/workout/WorkoutLogger';
import { Button } from '@/components/ui/button';
import { Video, Brain, Clock, Target } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const features = [
  {
    icon: Video,
    title: 'Видеоанализ в реальном времени',
    description: 'AI анализирует вашу технику через камеру и даёт мгновенные подсказки'
  },
  {
    icon: Brain,
    title: 'Умные рекомендации',
    description: 'Система помнит ваш прогресс и подбирает оптимальную нагрузку'
  },
  {
    icon: Clock,
    title: 'Таймер восстановления',
    description: 'AI определяет идеальное время отдыха на основе вашего пульса'
  },
  {
    icon: Target,
    title: 'Персональные цели',
    description: 'Отслеживание прогресса к вашим индивидуальным целям'
  }
];

export default function Workout() {
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

          {/* AI Features Preview */}
          <div className="space-y-6">
            <div className="rounded-2xl border bg-card p-6">
              <h2 className="text-xl font-bold mb-4">AI-функции</h2>
              <p className="text-muted-foreground mb-6">
                Подключите камеру для анализа техники в реальном времени
              </p>

              <Button 
                className="w-full gap-2 mb-6 bg-gradient-energy hover:opacity-90"
                onClick={() => {
                  toast({
                    title: 'Скоро!',
                    description: 'AI-анализ видео появится в следующем обновлении. Оставайтесь на связи!'
                  });
                }}
              >
                <Video className="h-4 w-4" />
                Включить AI-камеру
              </Button>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl border bg-card p-6">
              <h3 className="font-medium mb-4">Статистика сегодня</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">0</p>
                  <p className="text-sm text-muted-foreground">Упражнений</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">Подходов</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-muted-foreground">мин</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
