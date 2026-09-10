import { isSpeechSupported, speak } from "../utils/speech.js";

function QuizQuestion({ question, selectedOptionId, isAnswered, onSelectAnswer, speechLang }) {
  if (!question) return null;

  const handleListen = () => {
    speak(question.prompt, speechLang);
  };

  return (
    <div className="quiz-question">
      <div className="quiz-question__prompt-row">
        <p className="quiz-question__prompt">What does “{question.prompt}” mean?</p>
        <button
          type="button"
          className="icon-button"
          onClick={handleListen}
          disabled={!isSpeechSupported()}
          aria-label="Listen to the phrase"
          title="Listen to the phrase"
        >
          🔊
        </button>
      </div>
      {question.pronunciation && <p className="quiz-question__pronunciation">/{question.pronunciation}/</p>}

      <div className="quiz-question__options">
        {question.options.map((option) => {
          const isSelected = option.id === selectedOptionId;
          let stateClass = "";
          if (isAnswered) {
            if (option.isCorrect) {
              stateClass = "quiz-option--correct";
            } else if (isSelected) {
              stateClass = "quiz-option--incorrect";
            }
          } else if (isSelected) {
            stateClass = "quiz-option--selected";
          }

          return (
            <button
              key={option.id}
              type="button"
              className={`quiz-option ${stateClass}`}
              onClick={() => onSelectAnswer(option.id)}
              disabled={isAnswered}
              aria-pressed={isSelected}
            >
              <span className="quiz-option__text">{option.text}</span>
              {isAnswered && option.isCorrect && <span className="quiz-option__badge">Correct</span>}
              {isAnswered && isSelected && !option.isCorrect && <span className="quiz-option__badge">Your answer</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default QuizQuestion;
