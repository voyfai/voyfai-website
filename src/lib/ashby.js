const ENDPOINT =
  "https://api.ashbyhq.com/posting-api/job-board/voyfai?includeCompensation=true";

let cache = null;
let inflight = null;

function normalize(job) {
  return {
    id: job.id,
    title: job.title,
    department: job.department || "Other",
    team: job.team || job.department || "Other",
    location: job.location || "Remote",
    employmentType: job.employmentType || "FullTime",
    isRemote: Boolean(job.isRemote),
    workplaceType: job.workplaceType || null,
    publishedAt: job.publishedAt || null,
    applyUrl: job.applyUrl,
    jobUrl: job.jobUrl,
    descriptionHtml: job.descriptionHtml || "",
    descriptionPlain: job.descriptionPlain || "",
    compensation: job.compensation || null,
  };
}

export async function fetchAshbyJobs() {
  if (cache) return cache;
  if (inflight) return inflight;

  inflight = (async () => {
    const res = await fetch(ENDPOINT, { headers: { Accept: "application/json" } });
    if (!res.ok) {
      inflight = null;
      throw new Error(`Ashby ${res.status}`);
    }
    const data = await res.json();
    const jobs = Array.isArray(data?.jobs) ? data.jobs.map(normalize) : [];
    cache = jobs;
    inflight = null;
    return jobs;
  })();

  return inflight;
}

export function formatEmploymentType(type) {
  if (!type) return "";
  return type
    .replace(/([A-Z])/g, " $1")
    .replace(/^\s/, "")
    .replace(/\bFull Time\b/i, "Full-time")
    .replace(/\bPart Time\b/i, "Part-time");
}
