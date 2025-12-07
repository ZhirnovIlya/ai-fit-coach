import { Exercise } from "./data";
import { poseSamples } from "./ai-samples";

export type PoseKey =
  | "leftShoulder"
  | "rightShoulder"
  | "leftElbow"
  | "rightElbow"
  | "leftWrist"
  | "rightWrist"
  | "leftHip"
  | "rightHip"
  | "leftKnee"
  | "rightKnee"
  | "leftAnkle"
  | "rightAnkle";

export interface PosePoint {
  x: number;
  y: number;
  z?: number;
  score?: number;
}

export interface PoseFrame {
  timestamp: number;
  keypoints: Record<PoseKey, PosePoint>;
}

export interface TechniqueMetric {
  label: string;
  value: number;
  unit?: string;
  status: "good" | "warn";
  insight?: string;
}

export interface TechniqueReport {
  score: number;
  verdict: string;
  focusAreas: string[];
  metrics: TechniqueMetric[];
  frameCount: number;
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI;
}

function angle(a: PosePoint, b: PosePoint, c: PosePoint) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };
  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
  const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);
  if (magAB === 0 || magCB === 0) return 0;
  const cosine = Math.min(Math.max(dot / (magAB * magCB), -1), 1);
  return toDegrees(Math.acos(cosine));
}

function average(values: number[]) {
  if (!values.length) return 0;
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function evaluateSquat(frames: PoseFrame[]): TechniqueReport {
  const hipKneeAngles = frames.map((frame) => {
    const left = angle(frame.keypoints.leftHip, frame.keypoints.leftKnee, frame.keypoints.leftAnkle);
    const right = angle(frame.keypoints.rightHip, frame.keypoints.rightKnee, frame.keypoints.rightAnkle);
    return average([left, right]);
  });

  const backAngles = frames.map((frame) => {
    const left = angle(frame.keypoints.leftShoulder, frame.keypoints.leftHip, frame.keypoints.leftKnee);
    const right = angle(frame.keypoints.rightShoulder, frame.keypoints.rightHip, frame.keypoints.rightKnee);
    return average([left, right]);
  });

  const minDepth = Math.min(...hipKneeAngles);
  const backStability = 180 - Math.max(...backAngles.map((v) => Math.abs(180 - v)));
  const kneeValgus = Math.max(
    ...frames.map((frame) => Math.abs(frame.keypoints.leftKnee.x - frame.keypoints.leftAnkle.x - (frame.keypoints.rightKnee.x - frame.keypoints.rightAnkle.x)))
  );

  const depthScore = Math.min(100, Math.max(50, (150 - minDepth) * 1.4));
  const backScore = Math.max(60, Math.min(100, backStability));
  const valgusScore = Math.max(50, 100 - kneeValgus * 90);
  const score = Math.round(average([depthScore, backScore, valgusScore]));

  const metrics: TechniqueMetric[] = [
    {
      label: "Глубина приседа",
      value: Math.round(minDepth),
      unit: "°",
      status: minDepth <= 105 ? "good" : "warn",
      insight: minDepth <= 105 ? "Достаточная глубина" : "Опуститесь ниже параллели",
    },
    {
      label: "Спина",
      value: Math.round(backStability),
      unit: "°",
      status: backStability >= 160 ? "good" : "warn",
      insight: backStability >= 160 ? "Кор стабилен" : "Укрепите корпус и держите грудь расправленной",
    },
    {
      label: "Колени",
      value: Math.round(valgusScore),
      unit: "баллов",
      status: valgusScore >= 80 ? "good" : "warn",
      insight: valgusScore >= 80 ? "Колени двигаются ровно" : "Следите, чтобы колени не сводились внутрь",
    },
  ];

  const focusAreas = metrics.filter((m) => m.status === "warn").map((m) => m.insight || m.label);

  return {
    score,
    verdict: score >= 85 ? "Отличная техника" : score >= 70 ? "Хорошо, доработайте детали" : "Нужна коррекция",
    focusAreas,
    metrics,
    frameCount: frames.length,
  };
}

function evaluatePushUp(frames: PoseFrame[]): TechniqueReport {
  const elbowAngles = frames.map((frame) =>
    average([
      angle(frame.keypoints.leftShoulder, frame.keypoints.leftElbow, frame.keypoints.leftWrist ?? frame.keypoints.leftAnkle),
      angle(frame.keypoints.rightShoulder, frame.keypoints.rightElbow, frame.keypoints.rightWrist ?? frame.keypoints.rightAnkle),
    ])
  );

  const hipLine = frames.map((frame) =>
    average([
      angle(frame.keypoints.leftShoulder, frame.keypoints.leftHip, frame.keypoints.leftAnkle),
      angle(frame.keypoints.rightShoulder, frame.keypoints.rightHip, frame.keypoints.rightAnkle),
    ])
  );

  const depthScore = Math.min(100, Math.max(40, (Math.max(...elbowAngles) - 60) * 0.8));
  const bodyLineScore = Math.min(100, Math.max(50, 200 - Math.abs(180 - average(hipLine)) * 2));
  const score = Math.round(average([depthScore, bodyLineScore]));

  const metrics: TechniqueMetric[] = [
    {
      label: "Глубина",
      value: Math.round(Math.max(...elbowAngles)),
      unit: "°",
      status: Math.max(...elbowAngles) >= 100 ? "good" : "warn",
      insight: Math.max(...elbowAngles) >= 100 ? "Отличная амплитуда" : "Опускайтесь ниже, сохраняя контроль",
    },
    {
      label: "Линия корпуса",
      value: Math.round(average(hipLine)),
      unit: "°",
      status: Math.abs(180 - average(hipLine)) <= 12 ? "good" : "warn",
      insight: Math.abs(180 - average(hipLine)) <= 12 ? "Корпус ровный" : "Избегайте прогиба в пояснице",
    },
  ];

  const focusAreas = metrics.filter((m) => m.status === "warn").map((m) => m.insight || m.label);

  return {
    score,
    verdict: score >= 85 ? "Чистые отжимания" : "Есть куда расти",
    focusAreas,
    metrics,
    frameCount: frames.length,
  };
}

function evaluateHinge(frames: PoseFrame[]): TechniqueReport {
  const hipAngles = frames.map((frame) =>
    average([
      angle(frame.keypoints.leftShoulder, frame.keypoints.leftHip, frame.keypoints.leftKnee),
      angle(frame.keypoints.rightShoulder, frame.keypoints.rightHip, frame.keypoints.rightKnee),
    ])
  );

  const shinAngles = frames.map((frame) =>
    average([
      angle(frame.keypoints.leftHip, frame.keypoints.leftKnee, frame.keypoints.leftAnkle),
      angle(frame.keypoints.rightHip, frame.keypoints.rightKnee, frame.keypoints.rightAnkle),
    ])
  );

  const hingeScore = Math.min(100, Math.max(60, (200 - average(hipAngles)) * 1.2));
  const shinScore = Math.min(100, Math.max(55, 110 - Math.abs(average(shinAngles) - 170)));
  const score = Math.round(average([hingeScore, shinScore]));

  const metrics: TechniqueMetric[] = [
    {
      label: "Наклон таза",
      value: Math.round(average(hipAngles)),
      unit: "°",
      status: average(hipAngles) <= 140 ? "good" : "warn",
      insight: average(hipAngles) <= 140 ? "Хороший хип-хиндж" : "Отводите таз назад сильнее",
    },
    {
      label: "Колени",
      value: Math.round(average(shinAngles)),
      unit: "°",
      status: average(shinAngles) >= 165 ? "good" : "warn",
      insight: average(shinAngles) >= 165 ? "Голень стабильна" : "Не смещайте колени вперёд",
    },
  ];

  const focusAreas = metrics.filter((m) => m.status === "warn").map((m) => m.insight || m.label);

  return {
    score,
    verdict: score >= 85 ? "Сильный корпус" : "Сфокусируйтесь на наклоне таза",
    focusAreas,
    metrics,
    frameCount: frames.length,
  };
}

export function analyzeTechnique(exercise: Exercise) {
  const sample = poseSamples[exercise.id];
  if (!sample) {
    return {
      score: 75,
      verdict: "Недостаточно данных — ориентируйтесь на базовые подсказки",
      focusAreas: ["Запишите короткое видео для анализа"],
      metrics: [],
      frameCount: 0,
    } satisfies TechniqueReport;
  }

  if (exercise.muscleGroup === "chest" || exercise.id.includes("push")) {
    return evaluatePushUp(sample);
  }
  if (exercise.muscleGroup === "back" && exercise.id.includes("row")) {
    return evaluateHinge(sample);
  }
  if (exercise.muscleGroup === "legs" || exercise.id.includes("squat")) {
    return evaluateSquat(sample);
  }

  return evaluateHinge(sample);
}
