import { PoseFrame } from "./ai-engine";

const requiredKeys = [
  "leftShoulder",
  "rightShoulder",
  "leftElbow",
  "rightElbow",
  "leftWrist",
  "rightWrist",
  "leftHip",
  "rightHip",
  "leftKnee",
  "rightKnee",
  "leftAnkle",
  "rightAnkle",
] as const;

function frame(timestamp: number, points: Record<string, [number, number]>) {
  const base: any = {};
  Object.entries(points).forEach(([key, [x, y]]) => {
    base[key] = { x, y, score: 0.9 };
  });

  requiredKeys.forEach((key) => {
    if (!base[key]) {
      const fallback = base.leftHip || { x: 0.5, y: 0.7 };
      base[key] = { ...fallback };
    }
  });

  return { timestamp, keypoints: base } as PoseFrame;
}

export const poseSamples: Record<string, PoseFrame[]> = {
  "squat": [
    frame(0, {
      leftShoulder: [0.42, 0.25],
      rightShoulder: [0.58, 0.25],
      leftHip: [0.45, 0.55],
      rightHip: [0.55, 0.55],
      leftKnee: [0.46, 0.85],
      rightKnee: [0.54, 0.85],
      leftAnkle: [0.47, 1.05],
      rightAnkle: [0.53, 1.05],
    }),
    frame(400, {
      leftShoulder: [0.42, 0.27],
      rightShoulder: [0.58, 0.27],
      leftHip: [0.44, 0.68],
      rightHip: [0.56, 0.68],
      leftKnee: [0.46, 0.95],
      rightKnee: [0.54, 0.95],
      leftAnkle: [0.47, 1.07],
      rightAnkle: [0.53, 1.07],
    }),
    frame(800, {
      leftShoulder: [0.43, 0.28],
      rightShoulder: [0.57, 0.28],
      leftHip: [0.45, 0.72],
      rightHip: [0.55, 0.72],
      leftKnee: [0.46, 0.98],
      rightKnee: [0.54, 0.98],
      leftAnkle: [0.47, 1.07],
      rightAnkle: [0.53, 1.07],
    }),
  ],
  "split-squat": [
    frame(0, {
      leftShoulder: [0.42, 0.24],
      rightShoulder: [0.58, 0.24],
      leftHip: [0.46, 0.52],
      rightHip: [0.56, 0.58],
      leftKnee: [0.48, 0.82],
      rightKnee: [0.58, 0.9],
      leftAnkle: [0.50, 1.05],
      rightAnkle: [0.62, 1.08],
    }),
    frame(500, {
      leftShoulder: [0.43, 0.26],
      rightShoulder: [0.57, 0.26],
      leftHip: [0.45, 0.68],
      rightHip: [0.56, 0.74],
      leftKnee: [0.48, 0.98],
      rightKnee: [0.58, 1.02],
      leftAnkle: [0.50, 1.09],
      rightAnkle: [0.62, 1.11],
    })
  ],
  "push-up": [
    frame(0, {
      leftShoulder: [0.42, 0.48],
      rightShoulder: [0.58, 0.48],
      leftElbow: [0.42, 0.62],
      rightElbow: [0.58, 0.62],
      leftWrist: [0.42, 0.76],
      rightWrist: [0.58, 0.76],
      leftHip: [0.46, 0.70],
      rightHip: [0.54, 0.70],
      leftKnee: [0.48, 0.92],
      rightKnee: [0.52, 0.92],
      leftAnkle: [0.50, 1.08],
      rightAnkle: [0.50, 1.08],
    }),
    frame(400, {
      leftShoulder: [0.42, 0.50],
      rightShoulder: [0.58, 0.50],
      leftElbow: [0.44, 0.68],
      rightElbow: [0.56, 0.68],
      leftWrist: [0.46, 0.82],
      rightWrist: [0.54, 0.82],
      leftHip: [0.46, 0.72],
      rightHip: [0.54, 0.72],
      leftKnee: [0.48, 0.93],
      rightKnee: [0.52, 0.93],
      leftAnkle: [0.50, 1.09],
      rightAnkle: [0.50, 1.09],
    }),
    frame(800, {
      leftShoulder: [0.42, 0.46],
      rightShoulder: [0.58, 0.46],
      leftElbow: [0.43, 0.60],
      rightElbow: [0.57, 0.60],
      leftWrist: [0.45, 0.74],
      rightWrist: [0.55, 0.74],
      leftHip: [0.46, 0.68],
      rightHip: [0.54, 0.68],
      leftKnee: [0.48, 0.90],
      rightKnee: [0.52, 0.90],
      leftAnkle: [0.50, 1.08],
      rightAnkle: [0.50, 1.08],
    }),
  ],
  "barbell-row": [
    frame(0, {
      leftShoulder: [0.40, 0.32],
      rightShoulder: [0.60, 0.32],
      leftHip: [0.46, 0.62],
      rightHip: [0.54, 0.62],
      leftKnee: [0.48, 0.92],
      rightKnee: [0.52, 0.92],
      leftAnkle: [0.50, 1.08],
      rightAnkle: [0.50, 1.08],
    }),
    frame(500, {
      leftShoulder: [0.40, 0.34],
      rightShoulder: [0.60, 0.34],
      leftHip: [0.46, 0.66],
      rightHip: [0.54, 0.66],
      leftKnee: [0.48, 0.94],
      rightKnee: [0.52, 0.94],
      leftAnkle: [0.50, 1.08],
      rightAnkle: [0.50, 1.08],
    })
  ],
};
