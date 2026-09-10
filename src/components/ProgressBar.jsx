function ProgressBar({ percentage, label, size = "medium" }) {
  const safePercentage = Number.isFinite(percentage) ? Math.min(100, Math.max(0, percentage)) : 0;

  return (
    <div className={`progress-bar progress-bar--${size}`}>
      {label && (
        <div className="progress-bar__label">
          <span>{label}</span>
          <span className="progress-bar__percentage">{safePercentage}%</span>
        </div>
      )}
      <div
        className="progress-bar__track"
        role="progressbar"
        aria-valuenow={safePercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || "Progress"}
      >
        <div className="progress-bar__fill" style={{ width: `${safePercentage}%` }} />
      </div>
    </div>
  );
}

export default ProgressBar;
