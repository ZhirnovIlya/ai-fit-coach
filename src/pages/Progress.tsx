import { Layout } from '@/components/layout/Layout';
import { WeeklyChart } from '@/components/dashboard/WeeklyChart';
import { userProfile, weeklyStats } from '@/lib/data';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const weightProgress = [
  { week: 'Нед 1', squat: 80, bench: 60, deadlift: 100 },
  { week: 'Нед 2', squat: 85, bench: 65, deadlift: 105 },
  { week: 'Нед 3', squat: 85, bench: 67.5, deadlift: 110 },
  { week: 'Нед 4', squat: 90, bench: 70, deadlift: 115 },
  { week: 'Нед 5', squat: 92.5, bench: 72.5, deadlift: 120 },
  { week: 'Нед 6', squat: 95, bench: 75, deadlift: 125 },
  { week: 'Нед 7', squat: 100, bench: 80, deadlift: 130 }
];

const goals = [
  { name: 'Присед 120 кг', current: 100, target: 120, unit: 'кг' },
  { name: 'Жим 100 кг', current: 80, target: 100, unit: 'кг' },
  { name: '50 тренировок', current: 48, target: 50, unit: '' }
];

export default function ProgressPage() {
  const totalWorkouts = weeklyStats.filter(s => s.duration > 0).length;
  const avgCalories = Math.round(
    weeklyStats.reduce((acc, s) => acc + s.calories, 0) / totalWorkouts
  );

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Ваш прогресс</h1>
          <p className="text-muted-foreground">
            Отслеживайте результаты и достигайте целей
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Всего тренировок</span>
            </div>
            <p className="text-2xl font-bold">{userProfile.totalWorkouts}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-success" />
              <span className="text-sm text-muted-foreground">Тренировок в неделю</span>
            </div>
            <p className="text-2xl font-bold">{totalWorkouts}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-warning" />
              <span className="text-sm text-muted-foreground">Ср. калории</span>
            </div>
            <p className="text-2xl font-bold">{avgCalories}</p>
          </div>
          <div className="rounded-xl border bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Уровень</span>
            </div>
            <p className="text-2xl font-bold">{userProfile.level}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <WeeklyChart />

          {/* Weight Progress Chart */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="text-lg font-semibold mb-2">Прогресс весов</h3>
            <p className="text-sm text-muted-foreground mb-6">Рабочие веса за последние недели</p>

            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weightProgress}>
                  <XAxis 
                    dataKey="week" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      background: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="squat" 
                    stroke="hsl(var(--chart-1))" 
                    strokeWidth={2}
                    dot={false}
                    name="Присед"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="bench" 
                    stroke="hsl(var(--chart-2))" 
                    strokeWidth={2}
                    dot={false}
                    name="Жим"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="deadlift" 
                    stroke="hsl(var(--chart-3))" 
                    strokeWidth={2}
                    dot={false}
                    name="Становая"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: 'hsl(var(--chart-1))' }} />
                <span className="text-sm text-muted-foreground">Присед</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: 'hsl(var(--chart-2))' }} />
                <span className="text-sm text-muted-foreground">Жим</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full" style={{ background: 'hsl(var(--chart-3))' }} />
                <span className="text-sm text-muted-foreground">Становая</span>
              </div>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="rounded-2xl border bg-card p-6">
          <h3 className="text-lg font-semibold mb-6">Текущие цели</h3>
          <div className="space-y-6">
            {goals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}
