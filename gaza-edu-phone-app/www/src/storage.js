const PREFIX = "gaza-edu-offline";

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(`${PREFIX}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  localStorage.setItem(`${PREFIX}:${key}`, JSON.stringify(value));
}

export function getProgress() {
  return read("progress", {});
}

const DEMO_PROGRESS = {
  "g6-math-fractions": 72,
  "g6-arabic-reading": 100,
  "g6-science-cells": 45,
  "g6-english-daily-routines": 28,
  "g9-math-linear-equations": 55
};

export function ensureDemoProgress() {
  const progress = getProgress();
  if (Object.keys(progress).length === 0) {
    write("progress", { ...DEMO_PROGRESS });
  }
  ensureDemoQuizScores();
}

const DEMO_QUIZ_SCORES = {
  "g6-math-fractions": 85,
  "g6-arabic-reading": 92,
  "g6-science-cells": 78
};

export function ensureDemoQuizScores() {
  const scores = getQuizScores();
  if (Object.keys(scores).length > 0) return;
  const seeded = {};
  for (const [lessonId, score] of Object.entries(DEMO_QUIZ_SCORES)) {
    seeded[lessonId] = {
      score,
      savedAt: new Date().toISOString()
    };
  }
  write("quizScores", seeded);
}

export function setLessonProgress(lessonId, percent) {
  const progress = getProgress();
  progress[lessonId] = Math.max(0, Math.min(100, percent));
  write("progress", progress);
}

export function getQuizScores() {
  return read("quizScores", {});
}

export function saveQuizScore(lessonId, score) {
  const scores = getQuizScores();
  scores[lessonId] = {
    score,
    savedAt: new Date().toISOString()
  };
  write("quizScores", scores);
}

export function getStudentProfile() {
  return read("profile", {
    name: "أمينة",
    grade: 6,
    subjectId: "math",
    selectedLessonId: "g6-math-fractions",
    dailyGoalMinutes: 15
  });
}

export function setStudentProfile(profile) {
  write("profile", profile);
}
