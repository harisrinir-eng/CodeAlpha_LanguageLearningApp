const NAV_ITEMS = [
  { id: "learn", label: "Learn", icon: "📖" },
  { id: "quiz", label: "Quiz", icon: "✏️" },
  { id: "dashboard", label: "Dashboard", icon: "📊" },
];

function Header({ activeView, onChangeView }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__mark" aria-hidden="true">
          諺
        </span>
        <div>
          <p className="app-header__title">LinguaLearn</p>
          <p className="app-header__tagline">Small daily steps toward a new language</p>
        </div>
      </div>

      <nav className="app-header__nav" aria-label="Primary">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`app-header__nav-item ${activeView === item.id ? "app-header__nav-item--active" : ""}`}
            onClick={() => onChangeView(item.id)}
            aria-current={activeView === item.id ? "page" : undefined}
          >
            <span aria-hidden="true">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}

export default Header;
