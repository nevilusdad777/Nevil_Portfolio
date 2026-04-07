// Skills.jsx — Skills section with animated progress bars by category
import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { config } from "../../config/portfolio.config";
import "./Skills.css";

const CATEGORIES = [
  {
    key:   "frontend",
    label: "Frontend",
    icon:  "🎨",
    skills: config.skills.frontend,
  },
  {
    key:   "backend",
    label: "Backend",
    icon:  "⚙️",
    skills: config.skills.backend,
  },
  {
    key:   "tools",
    label: "Tools & DevOps",
    icon:  "🛠️",
    skills: config.skills.tools,
  },
];

function SkillBar({ name, level, category, index }) {
  return (
    <motion.div
      className="skill-item"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="skill-item__header">
        <span className="skill-item__name">{name}</span>
        <span className="skill-item__pct">{level}%</span>
      </div>
      <div className="skill-item__bar-track">
        <motion.div
          className={`skill-item__bar-fill skill-item__bar-fill--${category}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.07 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container">
        <SectionTitle
          label="My Skills"
          heading="What I Work With"
          sub="Technologies I use to craft elegant, performant web solutions."
        />

        <div className="skills__grid">
          {CATEGORIES.map((cat, catIdx) => (
            <motion.div
              key={cat.key}
              className={`skills__category skills__category--${cat.key}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: catIdx * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="skills__cat-header">
                <span className="skills__cat-icon">{cat.icon}</span>
                <h3 className="skills__cat-title">{cat.label}</h3>
                <span className="skills__cat-count">{cat.skills.length} skills</span>
              </div>

              <div className="skills__list">
                {cat.skills.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    category={cat.key}
                    index={i}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
