// useGitHubRepoCount.js — Fetches the count of public GitHub repositories
import { useEffect, useState } from "react";
import axios from "axios";

export function useGitHubRepoCount(username) {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchCount = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`
        );

        const publicRepos = data.filter((repo) => !repo.private);

        if (isMounted) {
          setCount(publicRepos.length);
        }
      } catch {
        if (isMounted) {
          setCount(0);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCount();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return { count, loading };
}
