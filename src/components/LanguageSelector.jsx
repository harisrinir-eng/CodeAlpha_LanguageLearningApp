import { LANGUAGES } from "../data/languageContent.js";

function LanguageSelector({ selectedLanguage, onSelectLanguage }) {
  return (
    <div className="language-selector" role="group" aria-label="Choose a language to learn">
      {LANGUAGES.map((language) => {
        const isActive = language.code === selectedLanguage;
        return (
          <button
            key={language.code}
            type="button"
            className={`language-chip ${isActive ? "language-chip--active" : ""}`}
            style={{ "--chip-accent": language.accent }}
            onClick={() => onSelectLanguage(language.code)}
            aria-pressed={isActive}
          >
            <span className="language-chip__native">{language.nativeName}</span>
            <span className="language-chip__name">{language.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSelector;
