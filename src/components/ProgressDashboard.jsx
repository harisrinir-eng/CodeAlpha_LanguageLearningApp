import { CATEGORIES, LANGUAGES } from "../data/languageContent.js";
import {
  getAllCategoryCompletion,
  getOverallCompletion,
  getQuizStatistics,
  getRecentQuizzes,
  getDailyGoalStatus,
} from "../utils/progressCalculations.js";
import ProgressBar from "./ProgressBar.jsx";
import EmptyState from "./EmptyState.jsx";

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch (error) {
    return "";
  }
}

function ProgressDashboard({ languageCode, progress, quizHistory, dailyActivity, dailyGoal, onChangeDailyGoal }) {
  const language = LANGUAGES.find((entry) => entry.code === languageCode);
  const overall = getOverallCompletion(progress, languageCode);
  const perCategory = getAllCategoryCompletion(progress, languageCode);
  const quizStats = getQuizStatistics(quizHistory, languageCode);
  const recentQuizzes = getRecentQuizzes(quizHistory, languageCode, 5);
  const dailyStatus = getDailyGoalStatus(dailyActivity, dailyGoal);

  return (
    <section className="panel dashboard">
      <h2 className="panel__title">Your progress in {language?.name}</h2>

      <div className="dashboard__grid">
        <div className="dashboard__card">
          <p className="dashboard__card-label">Overall completion</p>
          <p className="dashboard__card-value">{overall.percentage}%</p>
          <p className="dashboard__card-detail">
            {overall.completed} of {overall.total} learning items completed
          </p>
          <ProgressBar percentage={overall.percentage} />
        </div>

        <div className="dashboard__card">
          <p className="dashboard__card-label">Quiz attempts</p>
          <p className="dashboard__card-value">{quizStats.attempts}</p>
          <p className="dashboard__card-detail">Average score: {quizStats.averageScore}%</p>
        </div>

        <div className="dashboard__card">
          <p className="dashboard__card-label">Daily goal</p>
          <p className="dashboard__card-value">
            {dailyStatus.itemsTouched} / {dailyStatus.goal}
          </p>
          <ProgressBar percentage={dailyStatus.percentage} />
          <label className="dashboard__goal-control">
            Adjust goal:
            <input
              type="number"
              min="1"
              max="50"
              value={dailyGoal}
              onChange={(event) => onChangeDailyGoal(Number(event.target.value))}
            />
          </label>
        </div>
      </div>

      <div className="dashboard__section">
        <h3 className="dashboard__section-title">Category progress</h3>
        <div className="dashboard__categories">
          {CATEGORIES.map((category) => {
            const entry = perCategory[category.id];
            return (
              <div key={category.id} className="dashboard__category">
                <div className="dashboard__category-header">
                  <span>{category.label}</span>
                  <span>
                    {entry.completed}/{entry.total}
                  </span>
                </div>
                <ProgressBar percentage={entry.percentage} />
              </div>
            );
          })}
        </div>
      </div>

      <div className="dashboard__section">
        <h3 className="dashboard__section-title">Recent quiz performance</h3>
        {recentQuizzes.length === 0 ? (
          <EmptyState
            icon="🗒️"
            title="No quizzes yet"
            message="Complete a quiz to see your recent results and track your accuracy over time."
          />
        ) : (
          <ul className="dashboard__quiz-list">
            {recentQuizzes.map((quiz) => (
              <li key={quiz.id} className="dashboard__quiz-item">
                <div>
                  <p className="dashboard__quiz-category">{quiz.categoryLabel}</p>
                  <p className="dashboard__quiz-date">{formatDate(quiz.completedAt)}</p>
                </div>
                <div className="dashboard__quiz-score">
                  <span>
                    {quiz.correctAnswers}/{quiz.totalQuestions}
                  </span>
                  <span className="dashboard__quiz-accuracy">{quiz.accuracy}%</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default ProgressDashboard;
