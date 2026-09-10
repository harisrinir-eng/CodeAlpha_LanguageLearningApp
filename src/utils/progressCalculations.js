// progressCalculations.js
// Pure functions that turn raw stored data + the learning dataset into
// numbers the UI can display. Nothing here touches Local Storage or React
// state directly, which keeps the math easy to reason about and reuse.

import { CATEGORY_IDS, getContentFor } from "../data/languageContent.js";

function clampPercentage(value) {
  if (Number.isNaN(value) || !Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

/**
 * Returns { completed, total, percentage } for one language + category.
 */
export function getCategoryCompletion(progress, languageCode, categoryId) {
  const items = getContentFor(languageCode, categoryId);
  const total = items.length;
  const completedMap = progress.completedItems?.[languageCode]?.[categoryId] || {};
  const completed = items.filter((item) => completedMap[item.id]).length;
  const percentage = total === 0 ? 0 : clampPercentage((completed / total) * 100);
  return { completed, total, percentage };
}

/**
 * Returns completion info for every category of a language, keyed by category id.
 */
export function getAllCategoryCompletion(progress, languageCode) {
  return CATEGORY_IDS.reduce((acc, categoryId) => {
    acc[categoryId] = getCategoryCompletion(progress, languageCode, categoryId);
    return acc;
  }, {});
}

/**
 * Overall completion across every category for one language.
 */
export function getOverallCompletion(progress, languageCode) {
  const perCategory = getAllCategoryCompletion(progress, languageCode);
  const totals = Object.values(perCategory).reduce(
    (acc, entry) => {
      acc.completed += entry.completed;
      acc.total += entry.total;
      return acc;
    },
    { completed: 0, total: 0 }
  );
  const percentage = totals.total === 0 ? 0 : clampPercentage((totals.completed / totals.total) * 100);
  return { ...totals, percentage };
}

/**
 * Quiz statistics derived entirely from stored quiz attempts.
 */
export function getQuizStatistics(quizHistory, languageCode) {
  const relevant = quizHistory.filter((entry) => entry.languageCode === languageCode);
  const attempts = relevant.length;
  if (attempts === 0) {
    return { attempts: 0, averageScore: 0, bestScore: 0 };
  }
  const totalAccuracy = relevant.reduce((sum, entry) => sum + entry.accuracy, 0);
  const bestScore = relevant.reduce((max, entry) => Math.max(max, entry.accuracy), 0);
  return {
    attempts,
    averageScore: clampPercentage(totalAccuracy / attempts),
    bestScore: clampPercentage(bestScore),
  };
}

/**
 * Returns the most recent N quiz attempts for a language, newest first.
 */
export function getRecentQuizzes(quizHistory, languageCode, limit = 5) {
  return quizHistory
    .filter((entry) => entry.languageCode === languageCode)
    .sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt))
    .slice(0, limit);
}

/**
 * Today's date as a stable YYYY-MM-DD key, used to detect day changes
 * for the daily learning goal.
 */
export function getTodayKey() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Computes the daily-goal progress, resetting automatically when the
 * stored activity is from a previous day.
 */
export function getDailyGoalStatus(dailyActivity, dailyGoal) {
  const todayKey = getTodayKey();
  const itemsTouched = dailyActivity.date === todayKey ? dailyActivity.itemsTouched : 0;
  const goal = dailyGoal > 0 ? dailyGoal : 1;
  const percentage = clampPercentage((itemsTouched / goal) * 100);
  return { itemsTouched, goal: dailyGoal, percentage, todayKey };
}
