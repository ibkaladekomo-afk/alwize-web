# alwize website

Premium static marketing site. No build step, no dependencies — just HTML, CSS, and vanilla JS.
Deploys anywhere; these steps use Vercel.

## Files
- `index.html` — the whole site
- `styles.css` — brand styling
- `script.js` — nav, scroll reveal, FAQ, contact form
- `favicon.svg`

## Preview locally
Double-click `index.html` to open it in your browser. That's it.
(Or run `npx serve` in this folder for a local server.)

## Connect the contact form (2 min)
1. Go to **formspree.io**, sign up free, create a form, copy its endpoint
   (looks like `https://formspree.io/f/abcxyz`).
2. In `index.html`, find `https://formspree.io/f/REPLACE_ME` and replace `REPLACE_ME`
   with your form ID. Save.
   Submissions now arrive in your Formspree inbox and forward to your email.

## Deploy on Vercel — live in minutes

### Easiest (no GitHub): drag-and-drop
1. Install the CLI: `npm i -g vercel`
2. In this folder run `vercel` and follow the prompts. You get a live URL immediately.

### Recommended: GitHub + Vercel (auto-deploys on every change)
1. Create a repo on github.com (e.g. `alwize-web`).
2. In this folder:
   ```bash
   git init
   git add -A
   git commit -m "alwize website"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/alwize-web.git
   git push -u origin main
   ```
3. Go to **vercel.com/new**, import the repo, click **Deploy**.
   ~30 seconds later you have a live `*.vercel.app` URL.

## Connect getalwize.com
In your Vercel project → **Settings → Domains** → add `getalwize.com`.
Follow Vercel's DNS instructions at your domain registrar (add the A record `76.76.21.21`
and the `www` CNAME `cname.vercel-dns.com`, or point nameservers to Vercel).
SSL is automatic. Live once DNS propagates (usually minutes).

## Editing later
Change the text/colors in the files, then either re-run `vercel` (drag-drop path)
or `git commit` + `git push` (GitHub path) — Vercel redeploys automatically.
