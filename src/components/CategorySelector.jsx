import { CATEGORIES } from "../data/languageContent.js";

function CategorySelector({ activeCategory, onSelectCategory, completionByCategory }) {
  return (
    <div className="category-selector" role="tablist" aria-label="Learning categories">
      {CATEGORIES.map((category) => {
        const isActive = category.id === activeCategory;
        const completion = completionByCategory?.[category.id];
        return (
          <button
            key={category.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={`category-tab ${isActive ? "category-tab--active" : ""}`}
            onClick={() => onSelectCategory(category.id)}
          >
            <span className="category-tab__label">{category.label}</span>
            {completion && (
              <span className="category-tab__count">
                {completion.completed}/{completion.total}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default CategorySelector;
