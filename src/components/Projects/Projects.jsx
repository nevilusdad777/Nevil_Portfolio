// Projects.jsx — Fetches GitHub projects, filterable by tech
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGithub, FiExternalLink, FiFolder, FiStar, FiGitBranch } from "react-icons/fi";
import { SectionTitle } from "../ui/SectionTitle";
import { Badge } from "../ui/Badge";
import { SkeletonCard } from "../ui/Skeleton";
import { useGitHubProjects } from "../../hooks/useGitHubProjects";
import { config } from "../../config/portfolio.config";
import "./Projects.css";

const FILTERS = ["All", "React", "Node", "MongoDB", "JavaScript"];

export function Projects() {
  const { projects, loading, error } = useGitHubProjects(
    config.githubUsername,
    config.featuredRepos
  );
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    const search = activeFilter.toLowerCase();
    // Check language or topics for match
    return (
      (p.language && p.language.toLowerCase().includes(search)) ||
      (p.topics && p.topics.some((t) => t.toLowerCase().includes(search)))
    );
  });

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <SectionTitle
          label="My Work"
          heading="Featured Projects"
          sub="A selection of things I've built, fetched fresh from GitHub API."
        />

        {/* Filter buttons */}
        <div className="projects__filters">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`projects__filter-btn${activeFilter === f ? " projects__filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div layout className="projects__grid">
          <AnimatePresence mode="popLayout">
            {loading &&
              [1, 2, 3].map((i) => (
                <motion.div
                  key={`skeleton-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <SkeletonCard />
                </motion.div>
              ))}

            {error && !loading && (
              <div className="projects__error">{error}</div>
            )}

            {!loading && !error && filteredProjects.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="projects__empty"
              >
                No projects found for "{activeFilter}".
              </motion.div>
            )}

            {!loading &&
              !error &&
              filteredProjects.map((project, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  key={project.id}
                  className="project-card"
                >
                  <div className="project-card__header">
                    <FiFolder className="project-card__icon" />
                    <div className="project-card__links">
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-card__link">
                          <FiGithub />
                        </a>
                      )}
                      {project.homepage && (
                        <a href={project.homepage} target="_blank" rel="noopener noreferrer" className="project-card__link">
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="project-card__title">{project.name}</h3>
                  <p className="project-card__desc">{project.description}</p>

                  <div className="project-card__tags">
                    {project.language && <Badge label={project.language} />}
                    {project.topics &&
                      project.topics.slice(0, 3).map((t) => <Badge key={t} label={t} />)}
                  </div>

                  <div className="project-card__footer">
                    <span className="project-card__stat">
                      <FiStar /> {project.stars}
                    </span>
                    <span className="project-card__stat">
                      <FiGitBranch /> {project.forks}
                    </span>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
