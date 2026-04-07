// Button.jsx — Reusable button component with multiple variants
import "./Button.css";

export function Button({
  children,
  variant = "primary",
  href,
  target,
  onClick,
  className = "",
  ...props
}) {
  const cls = `btn btn--${variant} ${className}`;

  if (href) {
    return (
      <a href={href} target={target} rel="noopener noreferrer" className={cls} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
