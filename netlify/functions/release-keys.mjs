// Netlify Function: returns the key of each lesson whose release time has passed.
// Keys come from environment variables (Site settings > Environment variables), never from this file.
const RELEASES = {
  L2: "2026-11-26T18:00:00Z", // 26 Nov 2026, 19:00 Budapest (CET)
  L3: "2026-12-02T18:00:00Z", //  2 Dec 2026, 19:00 Budapest (CET)
  L4: "2026-12-03T18:00:00Z", //  3 Dec 2026, 19:00 Budapest (CET)
};
const ENV = { L2: "LESSON2_KEY", L3: "LESSON3_KEY", L4: "LESSON4_KEY" };

export function releasedKeys(now = Date.now(), env = process.env) {
  const released = {};
  for (const [lesson, at] of Object.entries(RELEASES)) {
    if (now >= Date.parse(at) && env[ENV[lesson]]) released[lesson] = env[ENV[lesson]];
  }
  return { now: new Date(now).toISOString(), released };
}

export default async () =>
  new Response(JSON.stringify(releasedKeys()), {
    headers: { "content-type": "application/json", "cache-control": "no-store, max-age=0" },
  });

export const config = { path: "/api/release-keys" };
