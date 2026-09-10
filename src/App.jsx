import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import LanguageSelector from "./components/LanguageSelector.jsx";
import CategorySelector from "./components/CategorySelector.jsx";
import LearningCard from "./components/LearningCard.jsx";
import LearningControls from "./components/LearningControls.jsx";
import Quiz from "./components/Quiz.jsx";
import ProgressDashboard from "./components/ProgressDashboard.jsx";
import EmptyState from "./components/EmptyState.jsx";
import { LANGUAGES, CATEGORIES, getContentFor } from "./data/languageContent.js";
import { useLearningProgress } from "./hooks/useLearningProgress.js";
import { loadQuizHistory, saveQuizHistory, isLocalStorageAvailable } from "./utils/storage.js";
import { getAllCategoryCompletion } from "./utils/progressCalculations.js";

function App() {
  const {
    preferences,
    progress,
    dailyActivity,
    setSelectedLanguage,
    setDailyGoal,
    markItemViewed,
    markItemCompleted,
  } = useLearningProgress();

  const [activeView, setActiveView] = useState("learn");
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizHistory, setQuizHistory] = useState(() => loadQuizHistory());

  const selectedLanguage = preferences.selectedLanguage;
  const currentLanguage = LANGUAGES.find((language) => language.code === selectedLanguage) || LANGUAGES[0];

  const items = useMemo(
    () => getContentFor(selectedLanguage, activeCategory),
    [selectedLanguage, activeCategory]
  );

  // Reset navigation state whenever the visible list of items changes so we
  // never point at an index that no longer exists.
  useEffect(() => {
    setCurrentIndex(0);
    setIsRevealed(false);
  }, [selectedLanguage, activeCategory]);

  useEffect(() => {
    saveQuizHistory(quizHistory);
  }, [quizHistory]);

  const currentItem = items.length > 0 ? items[Math.min(currentIndex, items.length - 1)] : null;

  useEffect(() => {
    if (currentItem) {
      markItemViewed(selectedLanguage, activeCategory, currentItem.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentItem?.id, selectedLanguage, activeCategory]);

  const searchResults = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return [];
    return items.filter(
      (item) =>
        item.sourceText.toLowerCase().includes(term) ||
        item.targetText.toLowerCase().includes(term)
    );
  }, [items, searchTerm]);

  const completionByCategory = getAllCategoryCompletion(progress, selectedLanguage);

  const handleSelectLanguage = (languageCode) => {
    setSelectedLanguage(languageCode);
    setSearchTerm("");
  };

  const handleSelectCategory = (categoryId) => {
    setActiveCategory(categoryId);
    setSearchTerm("");
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
    setIsRevealed(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1));
    setIsRevealed(false);
  };

  const handleReveal = () => setIsRevealed(true);

  const handleMarkComplete = () => {
    if (currentItem) {
      markItemCompleted(selectedLanguage, activeCategory, currentItem.id);
    }
  };

  const handleJumpToSearchResult = (itemId) => {
    const targetIndex = items.findIndex((item) => item.id === itemId);
    if (targetIndex >= 0) {
      setCurrentIndex(targetIndex);
      setIsRevealed(false);
      setSearchTerm("");
    }
  };

  const handleQuizComplete = (result) => {
    setQuizHistory((prev) => [...prev, result]);
  };

  const isCurrentItemCompleted = Boolean(
    currentItem && progress.completedItems?.[selectedLanguage]?.[activeCategory]?.[currentItem.id]
  );

  return (
    <div className="app-shell">
      <Header activeView={activeView} onChangeView={setActiveView} />

      {!isLocalStorageAvailable() && (
        <div className="storage-warning" role="alert">
          Local Storage isn't available in this browser session, so your progress won't be saved between visits.
        </div>
      )}

      <main className="app-main">
        <section className="panel language-panel">
          <h2 className="panel__title">Choose a language</h2>
          <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={handleSelectLanguage} />
        </section>

        {activeView === "learn" && (
          <>
            <section className="panel">
              <div className="learn-panel__top">
                <CategorySelector
                  activeCategory={activeCategory}
                  onSelectCategory={handleSelectCategory}
                  completionByCategory={completionByCategory}
                />
                <div className="search-box">
                  <label htmlFor="content-search" className="search-box__label">
                    Search this category
                  </label>
                  <input
                    id="content-search"
                    type="search"
                    className="search-box__input"
                    placeholder="Search by word, phrase, or translation"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                  />
                </div>
              </div>

              {searchTerm.trim() ? (
                searchResults.length > 0 ? (
                  <ul className="search-results">
                    {searchResults.map((item) => (
                      <li key={item.id}>
                        <button type="button" className="search-results__item" onClick={() => handleJumpToSearchResult(item.id)}>
                          <span>{item.sourceText}</span>
                          <span className="search-results__target">{item.targetText}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <EmptyState
                    icon="🔍"
                    title="No matches found"
                    message="Try a different word, phrase, or translation."
                  />
                )
              ) : items.length === 0 ? (
                <EmptyState
                  icon="🌱"
                  title="No content yet for this combination"
                  message="Try selecting a different language or category."
                />
              ) : (
                <>
                  <LearningCard
                    item={currentItem}
                    categoryId={activeCategory}
                    isRevealed={isRevealed}
                    onReveal={handleReveal}
                    speechLang={currentLanguage.speechLang}
                  />
                  <LearningControls
                    currentIndex={currentIndex}
                    total={items.length}
                    onPrevious={handlePrevious}
                    onNext={handleNext}
                    isRevealed={isRevealed}
                    onMarkComplete={handleMarkComplete}
                    isCompleted={isCurrentItemCompleted}
                  />
                </>
              )}
            </section>
          </>
        )}

        {activeView === "quiz" && (
          <Quiz
            languageCode={selectedLanguage}
            speechLang={currentLanguage.speechLang}
            onQuizComplete={handleQuizComplete}
            onNavigateToLearning={() => setActiveView("learn")}
          />
        )}

        {activeView === "dashboard" && (
          <ProgressDashboard
            languageCode={selectedLanguage}
            progress={progress}
            quizHistory={quizHistory}
            dailyActivity={dailyActivity}
            dailyGoal={preferences.dailyGoal}
            onChangeDailyGoal={setDailyGoal}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>Built for the CodeAlpha App Development Internship — Task 4: Language Learning App.</p>
      </footer>
    </div>
  );
}

export default App;
