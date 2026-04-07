// useGitHubProjects.js — Fetches GitHub repositories for the Projects section
import { useState, useEffect } from "react";
import axios from "axios";

export function useGitHubProjects(username, featuredRepos = []) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const featuredRepoNames = new Set(
    featuredRepos.map((name) => name.toLowerCase())
  );

  const getProjectDescription = (repo) => {
    if (repo.description && repo.description.trim()) {
      return repo.description.trim();
    }

    if (repo.topics && repo.topics.length > 0) {
      return `Built with ${repo.topics.slice(0, 3).join(", ")}.`;
    }

    return "No description added on GitHub yet.";
  };

  const createFeaturedPlaceholders = (currentUsername, repoNames) => {
    // Use placeholders so the UI can still show "My Work" even when the GitHub API is blocked.
    // (Stars/language/topics are unknown in this fallback.)
    return repoNames.map((name, idx) => ({
      id: `${name}-${idx}`,
      name,
      description: `GitHub repo: ${name}. Add a description on GitHub to show project details here.`,
      url: `https://github.com/${currentUsername}/${name}`,
      homepage: null,
      stars: 0,
      forks: 0,
      // Provide basic defaults so filter buttons still show results when using fallback data.
      language: "JavaScript",
      topics:
        name.toLowerCase().includes("fitnova")
          ? ["react", "node", "mongodb"]
          : name.toLowerCase().includes("fitness")
            ? ["react", "node"]
            : [],
    }));
  };

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );

        const publicRepos = data.filter((repo) => !repo.private);

        // Keep featured repos at the top, but do not hide the rest of the public projects.
        const repos = publicRepos.sort((a, b) => {
          const aFeatured = featuredRepoNames.has(a.name.toLowerCase());
          const bFeatured = featuredRepoNames.has(b.name.toLowerCase());

          if (aFeatured !== bFeatured) {
            return aFeatured ? -1 : 1;
          }

          return (
            b.stargazers_count - a.stargazers_count ||
            new Date(b.updated_at) - new Date(a.updated_at)
          );
        });

        const normalized = repos.map((r) => ({
          id: r.id,
          name: r.name,
          description: getProjectDescription(r),
          url: r.html_url,
          homepage: r.homepage,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          topics: r.topics || [],
        }));

        if (normalized.length === 0 && featuredRepos.length > 0) {
          setProjects(createFeaturedPlaceholders(username, featuredRepos));
          setError(null);
        } else {
          setProjects(normalized);
          setError(null);
        }
      } catch {
        // If GitHub API fails (rate limit / blocked), show only featured repos.
        if (featuredRepos.length > 0) {
          setProjects(createFeaturedPlaceholders(username, featuredRepos));
          setError(null);
        } else {
          setError("Failed to load projects from GitHub.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [username, featuredRepos]);

  return { projects, loading, error };
}
