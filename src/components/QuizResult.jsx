function getPerformanceMessage(accuracy) {
  if (accuracy === 100) return "Perfect score! That category is fully in your grasp.";
  if (accuracy >= 80) return "Excellent work — you're clearly retaining what you study.";
  if (accuracy >= 60) return "Solid effort. A little more review and this will stick.";
  if (accuracy >= 40) return "You're getting there — revisit the flashcards and try again.";
  return "Don't worry — go back through the flashcards and give it another go.";
}

function QuizResult({ correctAnswers, incorrectAnswers, totalQuestions, accuracy, onRetry, onBackToLearning }) {
  return (
    <div className="quiz-result">
      <p className="quiz-result__eyebrow">Quiz complete</p>
      <p className="quiz-result__score">
        {correctAnswers} / {totalQuestions}
      </p>
      <p className="quiz-result__accuracy">Accuracy: {accuracy}%</p>
      <p className="quiz-result__message">{getPerformanceMessage(accuracy)}</p>

      <div className="quiz-result__breakdown">
        <div className="quiz-result__stat">
          <span className="quiz-result__stat-value quiz-result__stat-value--correct">{correctAnswers}</span>
          <span className="quiz-result__stat-label">Correct</span>
        </div>
        <div className="quiz-result__stat">
          <span className="quiz-result__stat-value quiz-result__stat-value--incorrect">{incorrectAnswers}</span>
          <span className="quiz-result__stat-label">Incorrect</span>
        </div>
      </div>

      <div className="quiz-result__actions">
        <button type="button" className="button button--primary" onClick={onRetry}>
          Retry quiz
        </button>
        <button type="button" className="button button--ghost" onClick={onBackToLearning}>
          Back to flashcards
        </button>
      </div>
    </div>
  );
}

export default QuizResult;
