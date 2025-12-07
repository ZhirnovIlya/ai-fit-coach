// Mock data for the fitness app

export interface Exercise {
  id: string;
  name: string;
  nameRu: string;
  muscleGroup: string;
  muscleGroupRu: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  difficultyRu: string;
  description: string;
  tips: string[];
  image?: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  exerciseId: string;
  sets: { reps: number; weight: number }[];
  notes?: string;
  aiScore?: number;
  aiTips?: string[];
}

export interface UserProfile {
  name: string;
  age: number;
  weight: number;
  height: number;
  goal: 'weight_loss' | 'muscle_gain' | 'endurance' | 'strength';
  goalRu: string;
  level: number;
  xp: number;
  streak: number;
  totalWorkouts: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface DailyStats {
  date: string;
  calories: number;
  duration: number;
  exercises: number;
  heartRateAvg?: number;
}

export const exercises: Exercise[] = [
  {
    id: 'squat',
    name: 'Barbell Squat',
    nameRu: 'Приседания со штангой',
    muscleGroup: 'legs',
    muscleGroupRu: 'Ноги',
    difficulty: 'intermediate',
    difficultyRu: 'Средний',
    description: 'Базовое упражнение для развития силы ног и ягодиц. Задействует квадрицепсы, бицепсы бедра, ягодичные мышцы и кор.',
    tips: [
      'Держите спину прямой',
      'Колени не должны выходить за носки',
      'Опускайтесь до параллели с полом',
      'Дышите: вдох вниз, выдох вверх'
    ]
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    nameRu: 'Жим лёжа',
    muscleGroup: 'chest',
    muscleGroupRu: 'Грудь',
    difficulty: 'intermediate',
    difficultyRu: 'Средний',
    description: 'Классическое упражнение для развития грудных мышц, передних дельт и трицепсов.',
    tips: [
      'Лопатки сведены, грудь выгнута',
      'Опускайте штангу к нижней части груди',
      'Локти под углом 45° к телу',
      'Не отрывайте ягодицы от скамьи'
    ]
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    nameRu: 'Становая тяга',
    muscleGroup: 'back',
    muscleGroupRu: 'Спина',
    difficulty: 'advanced',
    difficultyRu: 'Продвинутый',
    description: 'Мощное базовое упражнение для всего тела. Развивает силу спины, ног и хват.',
    tips: [
      'Спина всегда прямая',
      'Штанга движется вдоль ног',
      'Толкайтесь ногами от пола',
      'Не округляйте поясницу'
    ]
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    nameRu: 'Подтягивания',
    muscleGroup: 'back',
    muscleGroupRu: 'Спина',
    difficulty: 'intermediate',
    difficultyRu: 'Средний',
    description: 'Отличное упражнение для развития широчайших мышц спины и бицепсов.',
    tips: [
      'Хват чуть шире плеч',
      'Тяните локти вниз',
      'Поднимайтесь до подбородка над перекладиной',
      'Контролируйте спуск'
    ]
  },
  {
    id: 'overhead-press',
    name: 'Overhead Press',
    nameRu: 'Жим стоя',
    muscleGroup: 'shoulders',
    muscleGroupRu: 'Плечи',
    difficulty: 'intermediate',
    difficultyRu: 'Средний',
    description: 'Базовое упражнение для развития дельтовидных мышц и трицепсов.',
    tips: [
      'Кор напряжён',
      'Не прогибайте поясницу',
      'Выжимайте штангу строго вверх',
      'Голова слегка отклоняется назад'
    ]
  },
  {
    id: 'plank',
    name: 'Plank',
    nameRu: 'Планка',
    muscleGroup: 'core',
    muscleGroupRu: 'Кор',
    difficulty: 'beginner',
    difficultyRu: 'Начальный',
    description: 'Статическое упражнение для укрепления мышц кора, стабилизаторов и всего тела.',
    tips: [
      'Тело в одну линию',
      'Не поднимайте таз',
      'Напрягите пресс и ягодицы',
      'Дышите равномерно'
    ]
  }
];

export const muscleGroups = [
  { id: 'all', name: 'Все', nameRu: 'Все' },
  { id: 'chest', name: 'Chest', nameRu: 'Грудь' },
  { id: 'back', name: 'Back', nameRu: 'Спина' },
  { id: 'legs', name: 'Legs', nameRu: 'Ноги' },
  { id: 'shoulders', name: 'Shoulders', nameRu: 'Плечи' },
  { id: 'arms', name: 'Arms', nameRu: 'Руки' },
  { id: 'core', name: 'Core', nameRu: 'Кор' }
];

export const userProfile: UserProfile = {
  name: 'Алексей',
  age: 28,
  weight: 82,
  height: 180,
  goal: 'muscle_gain',
  goalRu: 'Набор массы',
  level: 12,
  xp: 2450,
  streak: 7,
  totalWorkouts: 48,
  achievements: [
    {
      id: 'first-workout',
      name: 'Первый шаг',
      description: 'Завершите первую тренировку',
      icon: '🎯',
      unlockedAt: '2024-01-15'
    },
    {
      id: 'week-streak',
      name: 'Недельный воин',
      description: '7 дней тренировок подряд',
      icon: '🔥',
      unlockedAt: '2024-02-20'
    },
    {
      id: 'muscle-master',
      name: 'Мастер мышц',
      description: 'Проработайте все группы мышц за неделю',
      icon: '💪',
      unlockedAt: '2024-03-01'
    },
    {
      id: 'perfect-form',
      name: 'Идеальная техника',
      description: 'Получите 100% оценку от AI за технику',
      icon: '⭐',
      progress: 85,
      maxProgress: 100
    },
    {
      id: 'centurion',
      name: 'Центурион',
      description: 'Завершите 100 тренировок',
      icon: '🏆',
      progress: 48,
      maxProgress: 100
    }
  ]
};

export const weeklyStats: DailyStats[] = [
  { date: '2024-03-04', calories: 520, duration: 65, exercises: 8, heartRateAvg: 132 },
  { date: '2024-03-05', calories: 380, duration: 45, exercises: 6, heartRateAvg: 128 },
  { date: '2024-03-06', calories: 0, duration: 0, exercises: 0 },
  { date: '2024-03-07', calories: 610, duration: 75, exercises: 10, heartRateAvg: 140 },
  { date: '2024-03-08', calories: 450, duration: 55, exercises: 7, heartRateAvg: 135 },
  { date: '2024-03-09', calories: 490, duration: 60, exercises: 8, heartRateAvg: 130 },
  { date: '2024-03-10', calories: 550, duration: 70, exercises: 9, heartRateAvg: 138 }
];

export const recentWorkouts: WorkoutLog[] = [
  {
    id: 'w1',
    date: '2024-03-10',
    exerciseId: 'squat',
    sets: [
      { reps: 10, weight: 80 },
      { reps: 8, weight: 90 },
      { reps: 6, weight: 100 },
      { reps: 6, weight: 100 }
    ],
    aiScore: 92,
    aiTips: ['Отличная глубина приседа', 'Небольшое смещение коленей внутрь в последнем подходе']
  },
  {
    id: 'w2',
    date: '2024-03-10',
    exerciseId: 'bench-press',
    sets: [
      { reps: 12, weight: 60 },
      { reps: 10, weight: 70 },
      { reps: 8, weight: 80 }
    ],
    aiScore: 88,
    aiTips: ['Хорошая амплитуда движения', 'Попробуйте сильнее сводить лопатки']
  },
  {
    id: 'w3',
    date: '2024-03-09',
    exerciseId: 'deadlift',
    sets: [
      { reps: 8, weight: 100 },
      { reps: 6, weight: 120 },
      { reps: 5, weight: 130 }
    ],
    aiScore: 85,
    aiTips: ['Хорошая техника', 'Следите за положением головы — держите её нейтрально']
  }
];

export const aiRecommendations = [
  {
    id: '1',
    type: 'workout',
    title: 'Сегодня — день спины',
    description: 'Вы не тренировали спину 4 дня. Рекомендую включить подтягивания и тягу штанги.',
    priority: 'high'
  },
  {
    id: '2',
    type: 'recovery',
    title: 'Снизьте интенсивность',
    description: 'Ваш пульс восстановления показывает накопленную усталость. Сегодня лёгкая тренировка.',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'technique',
    title: 'Работа над задней дельтой',
    description: 'Анализ показывает отставание задних дельт. Добавьте разведения в наклоне.',
    priority: 'low'
  }
];
