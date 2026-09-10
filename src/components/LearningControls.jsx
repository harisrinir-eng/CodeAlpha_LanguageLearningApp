function LearningControls({ currentIndex, total, onPrevious, onNext, isRevealed, onMarkComplete, isCompleted }) {
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  return (
    <div className="learning-controls">
      <p className="learning-controls__counter" aria-live="polite">
        Card {total === 0 ? 0 : currentIndex + 1} of {total}
      </p>

      <div className="learning-controls__buttons">
        <button type="button" className="button button--ghost" onClick={onPrevious} disabled={isFirst}>
          ← Previous
        </button>

        <button
          type="button"
          className={`button ${isCompleted ? "button--success" : "button--secondary"}`}
          onClick={onMarkComplete}
          disabled={!isRevealed}
        >
          {isCompleted ? "✓ Completed" : "Mark as learned"}
        </button>

        <button type="button" className="button button--ghost" onClick={onNext} disabled={isLast}>
          Next →
        </button>
      </div>
    </div>
  );
}

export default LearningControls;
