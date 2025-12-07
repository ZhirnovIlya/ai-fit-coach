import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ExerciseCard } from '@/components/exercises/ExerciseCard';
import { ExerciseDetail } from '@/components/exercises/ExerciseDetail';
import { exercises, muscleGroups, Exercise } from '@/lib/data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Exercises() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('all');

  const filteredExercises = exercises.filter((ex) => {
    const matchesSearch = 
      ex.nameRu.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'all' || ex.muscleGroup === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Библиотека упражнений</h1>
          <p className="text-muted-foreground">
            Изучите технику с AI-подсказками и добавьте в тренировку
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск упражнений..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {muscleGroups.map((group) => (
              <Button
                key={group.id}
                variant={selectedMuscle === group.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedMuscle(group.id)}
                className="whitespace-nowrap"
              >
                {group.nameRu}
              </Button>
            ))}
          </div>
        </div>

        {/* Exercises Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              exercise={exercise}
              onClick={() => setSelectedExercise(exercise)}
            />
          ))}
        </div>

        {filteredExercises.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Упражнения не найдены</p>
          </div>
        )}

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <ExerciseDetail
            exercise={selectedExercise}
            onClose={() => setSelectedExercise(null)}
          />
        )}
      </div>
    </Layout>
  );
}
