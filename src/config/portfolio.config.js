// ============================================================
// portfolio.config.js — Central configuration for Nevil Usdad's portfolio
// Update this file to personalize all sections of the portfolio.
// ============================================================

export const config = {
  // ── Personal Info ───────────────────────────────────────────
  name: "Nevil Usdad",
  title: "Full Stack Web Developer",
  tagline: "I craft elegant, scalable digital experiences — from pixel-perfect UIs to robust backend systems.",
  email: "nevilusdad01@gmail.com",
  location: "India",
  avatarInitials: "NU",

  // ── GitHub API ──────────────────────────────────────────────
  // Replace with your actual GitHub username
  githubUsername: "nevilusdad777",
  // Repos to feature (leave empty [] to show all public repos sorted by stars)
  // Keep exactly the repos you want shown in "My Work"
  featuredRepos: ["fitnova-fullstack", "Fitness-Tracker"],

  // ── Social Links ────────────────────────────────────────────
  social: {
    github: "https://github.com/nevilusdad777",
    linkedin: "https://www.linkedin.com/in/nevil-usdad-a9b584270/",
    twitter: "https://twitter.com/nevil_usdad",
  },

  // ── Typing Effect Roles ─────────────────────────────────────
  roles: [
    "Full Stack Developer",
    "React Enthusiast",
    "Node.js Engineer",
    "UI/UX Craftsman",
    "Problem Solver",
  ],

  // ── About ───────────────────────────────────────────────────
  about: {
    paragraphs: [
      "Hey! I'm Nevil — a passionate Full Stack Web Developer with a love for building products that live at the intersection of beautiful design and solid engineering.",
      "I specialize in the JavaScript ecosystem, crafting end-to-end solutions using React on the frontend and Node.js/Express on the backend. I care deeply about clean code, performance, and developer experience.",
      "When I'm not shipping code, I'm exploring new tech, contributing to open-source, or sharpening my system design and problem-solving skills.",
    ],
    stats: [
      { label: "Projects Built", value: "10+" },
      { label: "Technologies", value: "15+" },
      { label: "Cups of Coffee", value: "∞" },
    ],
  },

  // ── Skills ──────────────────────────────────────────────────
  skills: {
    frontend: [
      { name: "React.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "HTML5 & CSS3", level: 92 },
      { name: "Tailwind CSS", level: 80 },
      { name: "Framer Motion", level: 72 },
    ],
    backend: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 83 },
      { name: "MongoDB", level: 78 },
      { name: "REST APIs", level: 88 },
      { name: "PostgreSQL", level: 65 },
    ],
    tools: [
      { name: "Git & GitHub", level: 90 },
      { name: "Vite / Webpack", level: 75 },
      { name: "Docker", level: 60 },
      { name: "Postman", level: 85 },
      { name: "VS Code", level: 95 },
    ],
  },
};
