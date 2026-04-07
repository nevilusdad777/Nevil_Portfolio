// Badge.jsx — Tech tag badge component
import "./Badge.css";

// Color map for common technologies
const TECH_COLORS = {
  react: { bg: "rgba(97,218,251,0.12)", color: "#61dafb" },
  node: { bg: "rgba(104,160,99,0.15)", color: "#68a063" },
  javascript: { bg: "rgba(247,223,30,0.12)", color: "#f7df1e" },
  python: { bg: "rgba(55,118,171,0.15)", color: "#3776ab" },
  mongodb: { bg: "rgba(0,237,100,0.12)", color: "#00ed64" },
  express: { bg: "rgba(255,255,255,0.08)", color: "#aaaaaa" },
  postgresql: { bg: "rgba(51,103,145,0.15)", color: "#336791" },
  stripe: { bg: "rgba(99,91,255,0.15)", color: "#635bff" },
  vite: { bg: "rgba(100,108,255,0.15)", color: "#646cff" },
  css: { bg: "rgba(21,114,182,0.12)", color: "#1572b6" },
  html: { bg: "rgba(227,76,38,0.12)", color: "#e34c26" },
  docker: { bg: "rgba(0,135,205,0.12)", color: "#0087cd" },
  git: { bg: "rgba(240,80,50,0.12)", color: "#f05032" },
  default: { bg: "rgba(108,99,255,0.12)", color: "#6c63ff" },
};

export function Badge({ label }) {
  const key = label?.toLowerCase()?.split(".")[0]?.split(" ")[0];
  const colors = TECH_COLORS[key] || TECH_COLORS.default;

  return (
    <span
      className="badge"
      style={{ background: colors.bg, color: colors.color, border: `1px solid ${colors.color}33` }}
    >
      {label}
    </span>
  );
}
