import { useCallback, useEffect, useState } from "react";
import {
  loadProgress,
  saveProgress,
  loadDailyActivity,
  saveDailyActivity,
  loadPreferences,
  savePreferences,
} from "../utils/storage.js";
import { getTodayKey } from "../utils/progressCalculations.js";

/**
 * Owns every piece of state that represents "what has the learner actually
 * done" — viewed/completed flashcards, the daily activity counter, and the
 * small set of persisted preferences (selected language + daily goal).
 *
 * All Local Storage reads happen once on mount; all writes happen through
 * the storage utility whenever the underlying state changes.
 */
export function useLearningProgress() {
  const [preferences, setPreferences] = useState(() => loadPreferences());
  const [progress, setProgress] = useState(() => loadProgress());
  const [dailyActivity, setDailyActivity] = useState(() => loadDailyActivity());

  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveDailyActivity(dailyActivity);
  }, [dailyActivity]);

  const setSelectedLanguage = useCallback((languageCode) => {
    setPreferences((prev) => ({ ...prev, selectedLanguage: languageCode }));
  }, []);

  const setDailyGoal = useCallback((goal) => {
    const safeGoal = Number.isFinite(goal) && goal > 0 ? Math.round(goal) : 1;
    setPreferences((prev) => ({ ...prev, dailyGoal: safeGoal }));
  }, []);

  const bumpDailyActivity = useCallback(() => {
    const todayKey = getTodayKey();
    setDailyActivity((prev) => {
      if (prev.date === todayKey) {
        return { ...prev, itemsTouched: prev.itemsTouched + 1 };
      }
      return { date: todayKey, itemsTouched: 1 };
    });
  }, []);

  const markItemViewed = useCallback(
    (languageCode, categoryId, itemId) => {
      setProgress((prev) => {
        const alreadyViewed = Boolean(prev.viewedItems?.[languageCode]?.[categoryId]?.[itemId]);
        if (alreadyViewed) return prev;
        return {
          ...prev,
          viewedItems: {
            ...prev.viewedItems,
            [languageCode]: {
              ...prev.viewedItems[languageCode],
              [categoryId]: {
                ...prev.viewedItems[languageCode]?.[categoryId],
                [itemId]: true,
              },
            },
          },
        };
      });
    },
    []
  );

  const markItemCompleted = useCallback(
    (languageCode, categoryId, itemId) => {
      let wasNewlyCompleted = false;
      setProgress((prev) => {
        const alreadyCompleted = Boolean(prev.completedItems?.[languageCode]?.[categoryId]?.[itemId]);
        if (alreadyCompleted) return prev;
        wasNewlyCompleted = true;
        return {
          ...prev,
          completedItems: {
            ...prev.completedItems,
            [languageCode]: {
              ...prev.completedItems[languageCode],
              [categoryId]: {
                ...prev.completedItems[languageCode]?.[categoryId],
                [itemId]: true,
              },
            },
          },
        };
      });
      if (wasNewlyCompleted) {
        bumpDailyActivity();
      }
    },
    [bumpDailyActivity]
  );

  return {
    preferences,
    progress,
    dailyActivity,
    setSelectedLanguage,
    setDailyGoal,
    markItemViewed,
    markItemCompleted,
  };
}
