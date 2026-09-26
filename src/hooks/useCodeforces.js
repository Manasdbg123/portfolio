import { useEffect, useState } from "react";

// Live Codeforces data from the public API (it allows browser requests).
// Returns null until loaded, or if the API cannot be reached, so callers
// always have the résumé values to fall back on.
const API = "https://codeforces.com/api";

export default function useCodeforces(handle) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!handle || typeof fetch !== "function") return undefined;
    const controller = new AbortController();
    const get = (path) =>
      fetch(`${API}/${path}`, { signal: controller.signal })
        .then((r) => r.json())
        .then((j) => (j.status === "OK" ? j.result : Promise.reject(new Error(j.comment))));

    Promise.all([get(`user.info?handles=${handle}`), get(`user.rating?handle=${handle}`).catch(() => [])])
      .then(([[info], history]) =>
        setData({
          rating: info.rating,
          maxRating: info.maxRating,
          rank: info.rank,
          maxRank: info.maxRank,
          avatar: info.titlePhoto,
          history: history.map((h) => ({ t: h.ratingUpdateTimeSeconds, r: h.newRating, rank: h.rank, contest: h.contestName })),
        })
      )
      .catch(() => {});
    return () => controller.abort();
  }, [handle]);

  return data;
}

// Official Codeforces title colours.
export function rankColor(rank = "") {
  const r = rank.toLowerCase();
  if (r.includes("legendary") || r === "grandmaster" || r.includes("international grandmaster")) return "#ff3333";
  if (r.includes("master") && !r.includes("candidate")) return "#ff8c00";
  if (r.includes("candidate")) return "#c147e9";
  if (r.includes("expert")) return "#4f7cff";
  if (r.includes("specialist")) return "#03a89e";
  if (r.includes("pupil")) return "#35b53a";
  return "#9ca3af";
}

export const titleCase = (s = "") => s.replace(/\b\w/g, (c) => c.toUpperCase());
