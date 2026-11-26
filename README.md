# Serencog Bootcamp Learning Hub

The student handbook as a website, with scheduled lesson access:

| Lesson | Opens (Budapest time) |
|---|---|
| Installation guide and Lesson 1 | Open now |
| Lesson 2: CSS | Thursday 26 November 2026, 19:00 CET |
| Lesson 3: JavaScript | Wednesday 2 December 2026, 19:00 CET |
| Lesson 4: Git, GitHub, deployment and React | Thursday 3 December 2026, 19:00 CET |

19:00 CET is 21:00 in Nairobi (EAT).

## How the lock works

- Lessons 2–4 are **encrypted** inside `public/index.html`. Reading the page source or changing the computer's clock shows nothing.
- `/api/release-keys` is a tiny server function. It checks the **server's** clock and returns a lesson's key only after that lesson's release time.
- The page asks it once a minute, and every 10 seconds once a release time has passed. A lesson opens by itself, with no refresh. Released lessons stay open.
- The keys are **not in this folder**. You add them as environment variables in your hosting dashboard.

## Files

```
public/index.html                      the Learning Hub page (served to students)
netlify/functions/release-keys.mjs     the release function for Netlify
api/release-keys.js                    the same function for Vercel
netlify.toml, vercel.json              hosting settings (only public/ is served)
```

## Deploy

You need the three keys from `LEARNING-HUB-KEYS-PRIVATE.txt` (sent separately). Never put that file in this folder or in a repository.

### Netlify

1. Push this folder to a GitHub repository (private is best), then in Netlify: **Add new site → Import an existing project** and pick the repository. Leave the build command empty; the publish directory is set by `netlify.toml`.
   (Or with the Netlify CLI: `npx netlify-cli deploy --prod` from this folder. Drag-and-drop deploys are not used, because they do not deploy the function.)
2. **Site configuration → Environment variables → Add a variable**, three times: `LESSON2_KEY`, `LESSON3_KEY`, `LESSON4_KEY`, with the values from the keys file.
3. **Deploys → Trigger deploy → Deploy site**, so the function sees the variables.

### Vercel

1. Push this folder to a GitHub repository, then in Vercel: **Add New → Project**, import it. Framework preset: **Other**. Leave the build command empty.
2. **Settings → Environment Variables**: add `LESSON2_KEY`, `LESSON3_KEY`, `LESSON4_KEY` (Production) with the values from the keys file.
3. **Deployments → … → Redeploy**, so the function sees the variables.

### Putting it inside the existing serencog.com site

Place `index.html` in a folder of your site (for example `/learn/`), and add the function to the site's existing functions folder (`netlify/functions/` or `api/`). The page always calls `/api/release-keys` on the same domain.

## Check it after deploying

1. Open `https://YOUR-SITE/api/release-keys`. Before 26 November 19:00 it shows `"released":{}`. If you see a 404, the function was not deployed.
2. Open the hub. Lesson 1 opens; Lessons 2–4 show a lock card with a countdown.
3. After 19:00 on 26 November, `/api/release-keys` lists `L2`, and Lesson 2 opens on the hub by itself.

## Changing a release time

Change the date in **both** functions and in `RELEASES` near the end of `public/index.html` (the countdown display), then redeploy. Times are written in UTC: 19:00 CET = 18:00Z.
# serencog-learning-hub
