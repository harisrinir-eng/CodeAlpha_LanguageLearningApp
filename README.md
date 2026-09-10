# LinguaLearn

**CodeAlpha App Development Internship — Task 4: Language Learning App**

## Project Description

LinguaLearn is a browser-based language learning companion built entirely with React, Vite, and the browser's own Local Storage and Speech Synthesis APIs — no backend, no external services, no authentication. It lets a learner pick a language, work through flashcards organized by category, test themselves with auto-generated quizzes, and watch their progress build up on a dashboard that is powered entirely by their own activity.

The app was designed and written from first principles for this internship task. All sample vocabulary, phrases, sentences, grammar notes, UI copy, component structure, and visual design are original.

## Objectives

- Help users learn new words, phrases, and sentences in a language of their choice.
- Provide interactive flashcards with translation and pronunciation.
- Offer quizzes that check what the learner has actually retained.
- Track real learning progress, not hard-coded numbers.
- Keep everything running client-side, persisted with Local Storage.

## Features

- **5 selectable languages** with original sample content in each.
- **4 learning categories** — Vocabulary, Common Phrases, Sentences, and Grammar.
- **Flashcard system** with reveal/hide, previous/next navigation, and a live card counter.
- **Pronunciation playback** via the Web Speech API, with a readable phonetic fallback when speech isn't supported.
- **Auto-generated multiple-choice quizzes**, built directly from the flashcard dataset, scoped to one category or "All Categories."
- **Progress dashboard** showing overall completion, per-category completion, quiz statistics, and recent quiz history.
- **Daily learning goal** that tracks how many items you've touched today and resets automatically on a new day.
- **Search** across the active category's words, phrases, and translations.
- **Local Storage persistence** for language selection, learning progress, quiz history, and daily activity — all isolated in a single storage utility module.

## Supported Learning Languages

| Language | Native name |
|---|---|
| Spanish | Español |
| French | Français |
| German | Deutsch |
| Japanese | 日本語 |
| Tamil | தமிழ் |

## Learning Categories

1. **Vocabulary** — everyday words with translation, pronunciation, and an example sentence.
2. **Common Phrases** — short expressions for real conversations.
3. **Sentences** — full sentences that put vocabulary in context.
4. **Grammar** — short grammar notes with an explanation and example.

## Flashcard / Lesson Functionality

Each flashcard shows the English prompt first. Tapping **Show Translation** reveals the target-language text, a phonetic pronunciation guide, a "Listen" button, and a short example or explanation. **Previous** and **Next** move through the deck, the revealed state resets on every card change, and the app never lets you move past the first or last card. A **Mark as learned** button records the card as completed once you've seen the answer.

## Pronunciation Functionality

Pronunciation uses the browser's built-in `SpeechSynthesis` API — no API key, no external audio files. If the browser doesn't support speech synthesis, the Listen button is disabled and a note explains that the phonetic guide above should be used instead. The app never crashes if speech is unavailable.

## Quiz Functionality

Quizzes are generated on the fly from the same dataset used for flashcards:

- Choose a specific category or "All Categories," then start the quiz.
- Each question asks what a target-language word/phrase/sentence/grammar term means, with up to four multiple-choice options and exactly one correct answer.
- Distractors are pulled from other items so options are meaningful and never duplicated.
- Answering shows immediate correct/incorrect feedback and disables further clicks on that question.
- At the end: score, correct/incorrect counts, accuracy percentage, a performance message, and a retry option.
- If a category doesn't have enough unique items to build a fair quiz, the app explains this instead of generating a broken quiz.

## Progress Tracking

Every statistic on the dashboard is derived from real stored data — nothing is hard-coded:

- Items viewed and completed, per language and category.
- Overall completion percentage per language.
- Quiz attempts, average score, and a list of recent quiz results with date, category, score, and accuracy.
- A daily goal counter that tracks items touched today and resets when the date changes.

## Local Storage Implementation

All persistence goes through `src/utils/storage.js`, which:

- Detects whether Local Storage is actually usable (and warns the user in-app if it isn't).
- Reads/writes JSON safely, falling back to sensible defaults if data is missing or malformed.
- Uses these keys: `lingualearn_preferences`, `lingualearn_progress`, `lingualearn_quiz_history`, `lingualearn_daily_activity`.

No other file in the app talks to `window.localStorage` directly.

## Technology Stack

- React 18 (functional components + hooks)
- Vite 5
- Plain CSS (no UI framework)
- Browser Local Storage
- Web Speech API (SpeechSynthesis)

## Project Structure

```
CodeAlpha_LanguageLearningApp/
├── public/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── LanguageSelector.jsx
│   │   ├── CategorySelector.jsx
│   │   ├── LearningCard.jsx
│   │   ├── LearningControls.jsx
│   │   ├── Quiz.jsx
│   │   ├── QuizQuestion.jsx
│   │   ├── QuizResult.jsx
│   │   ├── ProgressDashboard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── EmptyState.jsx
│   ├── hooks/
│   │   ├── useLearningProgress.js
│   │   └── useQuiz.js
│   ├── utils/
│   │   ├── storage.js
│   │   ├── progressCalculations.js
│   │   └── speech.js
│   ├── data/
│   │   └── languageContent.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation Requirements

- Node.js 18 or later
- npm 9 or later

## Installation Instructions

```bash
npm install
```

## How to Run Locally

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

## Build Instructions

```bash
npm run build
```

The production build is written to `dist/`. You can preview it locally with:

```bash
npm run preview
```

## Usage Instructions

1. Pick a language from the language selector at the top of the page.
2. Under **Learn**, choose a category and work through the flashcards — reveal the translation, listen to the pronunciation, and mark cards as learned.
3. Use the search box to jump straight to a specific word or phrase.
4. Switch to **Quiz**, pick a category (or "All Categories"), and test yourself.
5. Check **Dashboard** to see your overall progress, category breakdown, quiz history, and daily goal.

## Testing Checklist

- [x] Application starts with no console errors or broken imports.
- [x] Language selection changes the displayed content and persists on refresh.
- [x] Flashcards reveal/hide correctly; Previous/Next respect first/last boundaries; the counter updates; revealed state resets on navigation.
- [x] Listen button speaks the target-language text where SpeechSynthesis is supported, and is safely disabled otherwise.
- [x] All four categories load correct, distinct content.
- [x] Viewed/completed progress updates from real interaction, not hard-coded values.
- [x] Quizzes generate valid questions with one correct answer and no duplicate options; insufficient-data cases are handled gracefully.
- [x] Quiz scoring, accuracy, and retry all work correctly; results save to Local Storage.
- [x] Dashboard statistics (overall %, category %, quiz stats, recent quizzes) reflect actual stored data.
- [x] Data persists across page refreshes; malformed Local Storage data does not crash the app.
- [x] Layout is responsive across desktop, tablet, and mobile widths.
- [x] `npm run build` completes successfully.

## Screenshots

Add project screenshots here after running the application.

## Future Enhancements

- Spaced-repetition scheduling for flashcards due for review.
- Export/import of learning progress as a JSON file.
- Additional languages and a larger content set per language.
- Audio recording for pronunciation self-comparison.

## Author

Add author information here.
