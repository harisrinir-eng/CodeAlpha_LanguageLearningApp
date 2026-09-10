import { useState } from "react";
import { CATEGORIES } from "../data/languageContent.js";
import { useQuiz } from "../hooks/useQuiz.js";
import QuizQuestion from "./QuizQuestion.jsx";
import QuizResult from "./QuizResult.jsx";
import ProgressBar from "./ProgressBar.jsx";
import EmptyState from "./EmptyState.jsx";

function Quiz({ languageCode, speechLang, onQuizComplete, onNavigateToLearning }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    status,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOptionId,
    isAnswered,
    correctCount,
    incorrectCount,
    startQuiz,
    selectAnswer,
    goToNextQuestion,
    retryQuiz,
    resetToIdle,
  } = useQuiz({ languageCode, categoryId: selectedCategory, onQuizComplete });

  const handleChangeCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    resetToIdle();
  };

  if (status === "idle") {
    return (
      <section className="panel quiz-setup">
        <h2 className="panel__title">Test what you know</h2>
        <p className="panel__subtitle">Pick a category, then answer multiple-choice questions built from your flashcards.</p>

        <div className="quiz-setup__categories" role="radiogroup" aria-label="Quiz category">
          <button
            type="button"
            className={`category-tab ${selectedCategory === "all" ? "category-tab--active" : ""}`}
            onClick={() => handleChangeCategory("all")}
          >
            All Categories
          </button>
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              type="button"
              className={`category-tab ${selectedCategory === category.id ? "category-tab--active" : ""}`}
              onClick={() => handleChangeCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <button type="button" className="button button--primary quiz-setup__start" onClick={startQuiz}>
          Start Quiz
        </button>
      </section>
    );
  }

  if (status === "insufficient") {
    return (
      <section className="panel">
        <EmptyState
          icon="🧩"
          title="Not enough material for a quiz yet"
          message="This category doesn't have enough unique items in this language to build a fair quiz. Try a different category, or choose 'All Categories'."
          actionLabel="Choose another category"
          onAction={resetToIdle}
        />
      </section>
    );
  }

  if (status === "finished") {
    const accuracy = totalQuestions === 0 ? 0 : Math.round((correctCount / totalQuestions) * 100);
    return (
      <section className="panel">
        <QuizResult
          correctAnswers={correctCount}
          incorrectAnswers={incorrectCount}
          totalQuestions={totalQuestions}
          accuracy={accuracy}
          onRetry={retryQuiz}
          onBackToLearning={onNavigateToLearning}
        />
      </section>
    );
  }

  // status === "active"
  return (
    <section className="panel quiz-active">
      <div className="quiz-active__progress">
        <p className="quiz-active__counter" aria-live="polite">
          Question {currentIndex + 1} of {totalQuestions}
        </p>
        <ProgressBar percentage={((currentIndex + (isAnswered ? 1 : 0)) / totalQuestions) * 100} />
      </div>

      <QuizQuestion
        question={currentQuestion}
        selectedOptionId={selectedOptionId}
        isAnswered={isAnswered}
        onSelectAnswer={selectAnswer}
        speechLang={speechLang}
      />

      {isAnswered && (
        <div className="quiz-active__feedback" role="status">
          {selectedOptionId === currentQuestion.correctOptionId ? (
            <p className="quiz-active__feedback-text quiz-active__feedback-text--correct">Correct! Nicely done.</p>
          ) : (
            <p className="quiz-active__feedback-text quiz-active__feedback-text--incorrect">
              Not quite — the correct answer is highlighted above.
            </p>
          )}
          <button type="button" className="button button--primary" onClick={goToNextQuestion}>
            {currentIndex + 1 === totalQuestions ? "See results" : "Next question"}
          </button>
        </div>
      )}
    </section>
  );
}

export default Quiz;
