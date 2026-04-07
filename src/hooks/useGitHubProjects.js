// useGitHubProjects.js — Fetches GitHub repositories for the Projects section
import { useState, useEffect } from "react";
import axios from "axios";

export function useGitHubProjects(username, featuredRepos = []) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const createFeaturedPlaceholders = (currentUsername, repoNames) => {
    // Use placeholders so the UI can still show "My Work" even when the GitHub API is blocked.
    // (Stars/language/topics are unknown in this fallback.)
    return repoNames.map((name, idx) => ({
      id: `${name}-${idx}`,
      name,
      description: `GitHub repo: ${name}`,
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

        // Show all repos from the profile (including forks), so the Work section
        // reflects what the user sees on GitHub.
        let repos = data;

        // If featuredRepos list is provided, filter to only those
        if (featuredRepos.length > 0) {
          const featured = repos.filter((r) =>
            featuredRepos.some(
              (name) => name.toLowerCase() === r.name.toLowerCase()
            )
          );
          // Fallback: if none matched, show top 6 by stars
          repos =
            featured.length > 0
              ? featured
              : repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 6);
        } else {
          repos = repos
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);
        }

        // Normalize shape
        const normalized = repos.map((r) => ({
          id: r.id,
          name: r.name,
          description: r.description || "No description provided.",
          url: r.html_url,
          homepage: r.homepage,
          stars: r.stargazers_count,
          forks: r.forks_count,
          language: r.language,
          topics: r.topics || [],
        }));

        // If the API returned no repos, fall back to showing only featured repos.
        if (normalized.length === 0 && featuredRepos.length > 0) {
          setProjects(createFeaturedPlaceholders(username, featuredRepos));
          setError(null);
        } else {
          setProjects(normalized);
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
  }, [username]);

  return { projects, loading, error };
}
