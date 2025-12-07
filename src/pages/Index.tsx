import { Layout } from '@/components/layout/Layout';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { WeeklyChart } from '@/components/dashboard/WeeklyChart';
import { AiRecommendations } from '@/components/dashboard/AiRecommendations';
import { RecentWorkouts } from '@/components/dashboard/RecentWorkouts';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { userProfile, weeklyStats } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Flame, Timer, Dumbbell, Heart, Play, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroImage from '@/assets/hero-fitness.jpg';

const totalCalories = weeklyStats.reduce((acc, s) => acc + s.calories, 0);
const totalDuration = weeklyStats.reduce((acc, s) => acc + s.duration, 0);
const totalExercises = weeklyStats.reduce((acc, s) => acc + s.exercises, 0);
const avgHeartRate = Math.round(
  weeklyStats.filter(s => s.heartRateAvg).reduce((acc, s) => acc + (s.heartRateAvg || 0), 0) / 
  weeklyStats.filter(s => s.heartRateAvg).length
);

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="AI Fitness Coach" 
            className="w-full h-full object-cover opacity-30 dark:opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <div className="container relative py-16 md:py-24">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
              AI-тренер активен
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Привет, {userProfile.name}!<br />
              <span className="text-gradient-energy">Готов к тренировке?</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Ваш персональный AI-тренер анализирует технику в реальном времени 
              и создаёт индивидуальные программы под ваши цели.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link to="/workout">
                <Button size="lg" className="gap-2 bg-gradient-energy hover:opacity-90 text-lg px-8">
                  <Play className="h-5 w-5" />
                  Начать тренировку
                </Button>
              </Link>
              <Link to="/exercises">
                <Button size="lg" variant="outline" className="gap-2 text-lg">
                  Упражнения
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="container py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            title="Калории за неделю"
            value={`${totalCalories.toLocaleString()}`}
            subtitle="ккал сожжено"
            icon={<Flame className="h-6 w-6 text-primary" />}
            trend={{ value: 12, positive: true }}
            variant="primary"
          />
          <StatsCard
            title="Время тренировок"
            value={`${Math.floor(totalDuration / 60)}ч ${totalDuration % 60}м`}
            subtitle="за эту неделю"
            icon={<Timer className="h-6 w-6" />}
          />
          <StatsCard
            title="Упражнений"
            value={totalExercises}
            subtitle="выполнено"
            icon={<Dumbbell className="h-6 w-6" />}
            trend={{ value: 8, positive: true }}
          />
          <StatsCard
            title="Средний пульс"
            value={avgHeartRate}
            subtitle="ударов/мин"
            icon={<Heart className="h-6 w-6" />}
          />
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="container pb-16">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <WeeklyChart />
            <RecentWorkouts />
          </div>
          <div className="space-y-6">
            <StreakCard />
            <AiRecommendations />
          </div>
        </div>
      </section>
    </Layout>
  );
}
