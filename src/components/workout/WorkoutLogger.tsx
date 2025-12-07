import { useState } from 'react';
import { Exercise } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Save, Video } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useFitnessData } from '@/providers/FitnessDataProvider';
import { analyzeTechnique } from '@/lib/ai-engine';

interface WorkoutSet {
  reps: number;
  weight: number;
}

export function WorkoutLogger() {
  const { exercises, addWorkoutLog, saveAiReport } = useFitnessData();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [sets, setSets] = useState<WorkoutSet[]>([{ reps: 10, weight: 0 }]);
  const [notes, setNotes] = useState('');

  const addSet = () => {
    const lastSet = sets[sets.length - 1];
    setSets([...sets, { reps: lastSet?.reps || 10, weight: lastSet?.weight || 0 }]);
  };

  const removeSet = (index: number) => {
    if (sets.length > 1) {
      setSets(sets.filter((_, i) => i !== index));
    }
  };

  const updateSet = (index: number, field: keyof WorkoutSet, value: number) => {
    const newSets = [...sets];
    newSets[index][field] = value;
    setSets(newSets);
  };

  const saveWorkout = () => {
    if (!selectedExercise) {
      toast({
        title: 'Выберите упражнение',
        description: 'Пожалуйста, выберите упражнение для записи',
        variant: 'destructive'
      });
      return;
    }

    const aiReport = analyzeTechnique(selectedExercise);

    addWorkoutLog({
      date: new Date().toISOString(),
      exerciseId: selectedExercise.id,
      sets,
      notes,
      aiScore: aiReport.score,
      aiTips: aiReport.focusAreas,
    });

    saveAiReport({
      exerciseId: selectedExercise.id,
      exerciseName: selectedExercise.nameRu,
      score: aiReport.score,
      verdict: aiReport.verdict,
      focusAreas: aiReport.focusAreas,
      metrics: aiReport.metrics.map((m) => ({ label: m.label, value: m.value, unit: m.unit, status: m.status })),
      frameCount: aiReport.frameCount,
    });

    toast({
      title: 'Тренировка сохранена!',
      description: `${selectedExercise.nameRu}: ${sets.length} подходов записано`
    });

    // Reset form
    setSelectedExercise(null);
    setSets([{ reps: 10, weight: 0 }]);
    setNotes('');
  };

  return (
    <div className="rounded-2xl border bg-card p-6">
      <h2 className="text-xl font-bold mb-6">Записать тренировку</h2>

      <div className="space-y-6">
      <div className="space-y-2">
        <Label>Упражнение</Label>
        <Select
          value={selectedExercise?.id}
          onValueChange={(value) => {
              const ex = exercises.find(e => e.id === value);
              setSelectedExercise(ex || null);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Выберите упражнение" />
            </SelectTrigger>
            <SelectContent>
              {exercises.map((ex) => (
                <SelectItem key={ex.id} value={ex.id}>
                  {ex.nameRu}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label>Подходы</Label>
            <Button variant="outline" size="sm" onClick={addSet} className="gap-1">
              <Plus className="h-4 w-4" />
              Добавить
            </Button>
          </div>

          {sets.map((set, index) => (
            <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {index + 1}
              </span>
              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs text-muted-foreground">Повторения</Label>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground">Вес (кг)</Label>
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) => updateSet(index, 'weight', parseFloat(e.target.value) || 0)}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeSet(index)}
                disabled={sets.length === 1}
                className="shrink-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-2">
          <Label>Заметки (опционально)</Label>
          <Input
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Как прошла тренировка?"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 gap-2"
            onClick={() => {
              toast({
                title: 'AI-анализ',
                description: 'Функция видеоанализа будет доступна в следующем обновлении'
              });
            }}
          >
            <Video className="h-4 w-4" />
            AI-анализ видео
          </Button>
          <Button 
            className="flex-1 gap-2 bg-gradient-energy hover:opacity-90"
            onClick={saveWorkout}
          >
            <Save className="h-4 w-4" />
            Сохранить
          </Button>
        </div>
      </div>
    </div>
  );
}
