import { useCallback, useMemo, useState } from "react";
import { getAllContentFor, getContentFor, CATEGORIES } from "../data/languageContent.js";

const QUESTION_COUNT_TARGET = 8;
const MIN_OPTIONS = 2;
const MAX_OPTIONS = 4;
const MIN_QUESTIONS_REQUIRED = 3;

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Builds a set of well-formed multiple-choice questions from a content
 * pool. Every question has exactly one correct answer, no duplicate
 * option text, and a reasonable number of meaningful distractors.
 */
function buildQuestions(pool) {
  // Only keep items with usable text, and de-duplicate by sourceText so
  // two different items never produce two identical-looking answers.
  const seenSourceTexts = new Set();
  const uniquePool = pool.filter((item) => {
    if (!item.sourceText || !item.targetText) return false;
    const key = item.sourceText.trim().toLowerCase();
    if (seenSourceTexts.has(key)) return false;
    seenSourceTexts.add(key);
    return true;
  });

  if (uniquePool.length < MIN_QUESTIONS_REQUIRED) {
    return [];
  }

  const questionCandidates = shuffle(uniquePool).slice(0, QUESTION_COUNT_TARGET);

  return questionCandidates.map((questionItem, index) => {
    const distractorPool = uniquePool.filter((item) => item.id !== questionItem.id);
    const distractorCount = Math.min(MAX_OPTIONS - 1, distractorPool.length);
    const chosenDistractors = shuffle(distractorPool).slice(0, Math.max(distractorCount, MIN_OPTIONS - 1));

    const options = shuffle([
      { id: `${questionItem.id}-correct`, text: questionItem.sourceText, isCorrect: true },
      ...chosenDistractors.map((distractor, distractorIndex) => ({
        id: `${questionItem.id}-d${distractorIndex}`,
        text: distractor.sourceText,
        isCorrect: false,
      })),
    ]);

    return {
      id: `q-${index}-${questionItem.id}`,
      itemId: questionItem.id,
      category: questionItem.category,
      prompt: questionItem.targetText,
      pronunciation: questionItem.pronunciation,
      options,
      correctOptionId: options.find((option) => option.isCorrect).id,
    };
  });
}

const CATEGORY_LABEL_BY_ID = CATEGORIES.reduce((acc, category) => {
  acc[category.id] = category.label;
  return acc;
}, {});

export function useQuiz({ languageCode, categoryId, onQuizComplete }) {
  const [status, setStatus] = useState("idle"); // idle | active | finished
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerLog, setAnswerLog] = useState([]);

  const contentPool = useMemo(() => {
    if (categoryId === "all") {
      return getAllContentFor(languageCode);
    }
    return getContentFor(languageCode, categoryId).map((item) => ({ ...item, category: categoryId }));
  }, [languageCode, categoryId]);

  const startQuiz = useCallback(() => {
    const built = buildQuestions(contentPool);
    setQuestions(built);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setAnswerLog([]);
    setStatus(built.length === 0 ? "insufficient" : "active");
  }, [contentPool]);

  const currentQuestion = questions[currentIndex] || null;

  const selectAnswer = useCallback(
    (optionId) => {
      if (isAnswered || !currentQuestion) return; // prevent accidental double submission
      setSelectedOptionId(optionId);
      setIsAnswered(true);
      const isCorrect = optionId === currentQuestion.correctOptionId;
      setAnswerLog((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          itemId: currentQuestion.itemId,
          category: currentQuestion.category,
          isCorrect,
        },
      ]);
    },
    [isAnswered, currentQuestion]
  );

  const goToNextQuestion = useCallback(() => {
    if (!isAnswered) return;
    const isLastQuestion = currentIndex >= questions.length - 1;
    if (isLastQuestion) {
      const correctAnswers = answerLog.filter((entry) => entry.isCorrect).length;
      const totalQuestions = questions.length;
      const accuracy = totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);
      const result = {
        id: `quiz-${Date.now()}`,
        languageCode,
        categoryId,
        categoryLabel: categoryId === "all" ? "All Categories" : CATEGORY_LABEL_BY_ID[categoryId] || categoryId,
        totalQuestions,
        correctAnswers,
        incorrectAnswers: totalQuestions - correctAnswers,
        accuracy,
        completedAt: new Date().toISOString(),
      };
      setStatus("finished");
      if (onQuizComplete) {
        onQuizComplete(result);
      }
      return;
    }
    setCurrentIndex((prev) => prev + 1);
    setSelectedOptionId(null);
    setIsAnswered(false);
  }, [isAnswered, currentIndex, questions.length, answerLog, languageCode, categoryId, onQuizComplete]);

  const retryQuiz = useCallback(() => {
    startQuiz();
  }, [startQuiz]);

  const resetToIdle = useCallback(() => {
    setStatus("idle");
    setQuestions([]);
    setCurrentIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setAnswerLog([]);
  }, []);

  const correctCount = answerLog.filter((entry) => entry.isCorrect).length;
  const incorrectCount = answerLog.length - correctCount;

  return {
    status,
    questions,
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    selectedOptionId,
    isAnswered,
    correctCount,
    incorrectCount,
    startQuiz,
    selectAnswer,
    goToNextQuestion,
    retryQuiz,
    resetToIdle,
  };
}
