import { useEffect, useState } from "react";
import { fetchAshbyJobs } from "../lib/ashby";

export default function useAshbyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchAshbyJobs()
      .then((list) => {
        if (!cancelled) {
          setJobs(list);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { jobs, loading, error };
}
