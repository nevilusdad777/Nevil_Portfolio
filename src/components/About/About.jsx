// About.jsx — About section with personality traits and developer stats
import { motion } from "framer-motion";
import { SectionTitle } from "../ui/SectionTitle";
import { config } from "../../config/portfolio.config";
import { useGitHubRepoCount } from "../../hooks/useGitHubRepoCount";
import "./About.css";

const TRAITS = [
  {
    icon: "🎨",
    title: "Design-Driven",
    desc: "I care about pixels as much as logic — both must be elegant.",
  },
  {
    icon: "⚡",
    title: "Performance-Obsessed",
    desc: "Lazy-loading, code splitting, memoization — I do it all.",
  },
  {
    icon: "🧩",
    title: "Clean Architecture",
    desc: "Modular code, separation of concerns, and clean naming conventions.",
  },
  {
    icon: "🌱",
    title: "Always Growing",
    desc: "Constantly learning new technologies and sharpening my craft.",
  },
];

const fadeLeft  = { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };
const fadeRight = { hidden: { opacity: 0, x: 40  }, show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export function About() {
  const { count } = useGitHubRepoCount(config.githubUsername);

  return (
    <section id="about" className="section about">
      <div className="container">
        <SectionTitle
          label="About Me"
          heading="Who I Am"
          sub="A developer who blends technical precision with creative vision."
        />

        <div className="about__inner">
          {/* Left: Bio text */}
          <motion.div
            className="about__text"
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <h3>
              Building the web, <span className="gradient-text">one commit at a time.</span>
            </h3>

            <div className="about__paragraphs">
              {config.about.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="about__stats">
              {config.about.stats.map(({ label, value }) => (
                <div className="about__stat" key={label}>
                  <span className="about__stat-value">
                    {label === "Projects Built" && count > 0 ? `${count}+` : value}
                  </span>
                  <span className="about__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Card */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="about__card">
              <p className="about__card-title">✦ Developer Profile</p>

              <div className="about__traits">
                {TRAITS.map(({ icon, title, desc }) => (
                  <div className="about__trait" key={title}>
                    <span className="about__trait-icon">{icon}</span>
                    <div className="about__trait-text">
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini code snippet */}
              <div className="about__code-snippet">
                <span className="code-kw">const </span>
                <span className="code-var">nevil </span>
                <span className="code-kw">= </span>
                <span>{"{"}</span>
                <br />
                {"  "}<span className="code-var">role</span>: <span className="code-str">"Full Stack Dev"</span>,<br />
                {"  "}<span className="code-var">passion</span>: <span className="code-str">"Building great UX"</span>,<br />
                {"  "}<span className="code-var">available</span>: <span className="code-kw">true</span>,<br />
                <span className="code-cm">{"  // ready to ship 🚀"}</span><br />
                {"}"}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
