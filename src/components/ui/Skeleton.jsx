// Skeleton.jsx — Loading placeholder component for project cards
import "./Skeleton.css";

export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton skeleton-line skeleton-line--title" />
      <div className="skeleton skeleton-line skeleton-line--text" />
      <div className="skeleton skeleton-line skeleton-line--text" />
      <div className="skeleton skeleton-line skeleton-line--short" />
      <div className="skeleton-tags">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton skeleton-line--tag" />
        ))}
      </div>
    </div>
  );
}
