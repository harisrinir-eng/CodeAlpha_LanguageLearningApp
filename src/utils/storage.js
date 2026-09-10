// storage.js
// A single, isolated place for every Local Storage interaction in LinguaLearn.
// No other file should call window.localStorage directly.

const STORAGE_KEYS = {
  preferences: "lingualearn_preferences",
  progress: "lingualearn_progress",
  quizHistory: "lingualearn_quiz_history",
  dailyActivity: "lingualearn_daily_activity",
};

/**
 * Detects whether Local Storage is actually usable in this browser/session
 * (private browsing modes and some embedded contexts can throw).
 */
function isStorageAvailable() {
  try {
    const testKey = "__lingualearn_storage_test__";
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
}

const storageAvailable = isStorageAvailable();

function readJSON(key, fallback) {
  if (!storageAvailable) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch (error) {
    // Malformed JSON or any unexpected read error: fall back safely
    // instead of letting the application crash.
    console.warn(`LinguaLearn storage: could not read "${key}", using default.`, error);
    return fallback;
  }
}

function writeJSON(key, value) {
  if (!storageAvailable) return false;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.warn(`LinguaLearn storage: could not write "${key}".`, error);
    return false;
  }
}

// ---------- Preferences (selected language, daily goal, etc.) ----------

const DEFAULT_PREFERENCES = {
  selectedLanguage: "es",
  dailyGoal: 10,
};

export function loadPreferences() {
  const stored = readJSON(STORAGE_KEYS.preferences, {});
  return { ...DEFAULT_PREFERENCES, ...stored };
}

export function savePreferences(preferences) {
  writeJSON(STORAGE_KEYS.preferences, preferences);
}

// ---------- Learning progress (per language/category completed items) ----------

const DEFAULT_PROGRESS = {
  // shape: { [languageCode]: { [categoryId]: { [itemId]: true } } }
  completedItems: {},
  // shape: { [languageCode]: { [categoryId]: { [itemId]: true } } }
  viewedItems: {},
};

export function loadProgress() {
  const stored = readJSON(STORAGE_KEYS.progress, {});
  return {
    completedItems: stored.completedItems || {},
    viewedItems: stored.viewedItems || {},
  };
}

export function saveProgress(progress) {
  writeJSON(STORAGE_KEYS.progress, progress);
}

// ---------- Quiz history ----------

export function loadQuizHistory() {
  const stored = readJSON(STORAGE_KEYS.quizHistory, []);
  return Array.isArray(stored) ? stored : [];
}

export function saveQuizHistory(history) {
  writeJSON(STORAGE_KEYS.quizHistory, history);
}

// ---------- Daily activity (for the daily goal widget) ----------

const DEFAULT_DAILY_ACTIVITY = {
  date: null,
  itemsTouched: 0,
};

export function loadDailyActivity() {
  const stored = readJSON(STORAGE_KEYS.dailyActivity, {});
  return { ...DEFAULT_DAILY_ACTIVITY, ...stored };
}

export function saveDailyActivity(activity) {
  writeJSON(STORAGE_KEYS.dailyActivity, activity);
}

export function isLocalStorageAvailable() {
  return storageAvailable;
}

export { STORAGE_KEYS };
