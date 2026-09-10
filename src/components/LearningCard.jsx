import { isSpeechSupported, speak } from "../utils/speech.js";

function LearningCard({ item, categoryId, isRevealed, onReveal, speechLang }) {
  if (!item) return null;

  const speechAvailable = isSpeechSupported();
  const promptLabel = categoryId === "grammar" ? "Grammar topic" : "Prompt";
  const revealLabel = categoryId === "grammar" ? "Explanation" : "Translation";
  const noteLabel = categoryId === "grammar" ? "Explanation" : "Example";

  const handleListen = () => {
    speak(item.targetText, speechLang);
  };

  return (
    <div className="flashcard">
      <div className="flashcard__eyebrow">{promptLabel}</div>
      <p className="flashcard__source">{item.sourceText}</p>

      {!isRevealed ? (
        <button type="button" className="button button--primary flashcard__reveal-button" onClick={onReveal}>
          Show {revealLabel}
        </button>
      ) : (
        <div className="flashcard__answer">
          <div className="flashcard__target-row">
            <p className="flashcard__target">{item.targetText}</p>
            <button
              type="button"
              className="icon-button"
              onClick={handleListen}
              disabled={!speechAvailable}
              title={speechAvailable ? "Listen to pronunciation" : "Speech playback isn't supported in this browser"}
              aria-label="Listen to pronunciation"
            >
              🔊
            </button>
          </div>
          <p className="flashcard__pronunciation">/{item.pronunciation}/</p>
          {!speechAvailable && (
            <p className="flashcard__speech-note">
              Pronunciation playback isn't available in this browser — read the phonetic guide above instead.
            </p>
          )}
          {item.note && (
            <div className="flashcard__note">
              <span className="flashcard__note-label">{noteLabel}</span>
              <p>{item.note}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LearningCard;
