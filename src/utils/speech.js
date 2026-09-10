// speech.js
// A thin, defensive wrapper around the browser's SpeechSynthesis API.
// The rest of the app never touches window.speechSynthesis directly.

export function isSpeechSupported() {
  return typeof window !== "undefined" && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function";
}

/**
 * Speaks the given text using the browser's built-in speech engine.
 * Fails silently (returns false) instead of throwing, so callers never
 * need to worry about crashing the UI on unsupported browsers.
 */
export function speak(text, languageCode) {
  if (!isSpeechSupported() || !text) return false;

  try {
    // Cancel anything currently queued so rapid clicks don't stack up.
    window.speechSynthesis.cancel();

    const utterance = new window.SpeechSynthesisUtterance(text);
    if (languageCode) {
      utterance.lang = languageCode;
    }
    utterance.rate = 0.9;
    utterance.pitch = 1;

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (error) {
    console.warn("LinguaLearn speech: unable to play pronunciation.", error);
    return false;
  }
}

export function stopSpeaking() {
  if (!isSpeechSupported()) return;
  try {
    window.speechSynthesis.cancel();
  } catch (error) {
    // Nothing meaningful to do if cancellation itself fails.
  }
}
