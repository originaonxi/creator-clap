# Creator Clap — Handoff

**Live:** https://creatorclap.netlify.app (Netlify site `creatorclap`, id `e5bbb7e7-35d3-4310-8358-dddfcfe1d3eb`)
**Code:** `C:\Users\samaa\Downloads\project-bolt-sb1-fkt6zdvd\project` (React 18 + TS + Vite + Tailwind, front-end only, mock auth in localStorage)

## Deploy (manual zip — Netlify is NOT linked to git)
```bash
npm run build
python -c "import shutil;shutil.make_archive('cc_dist','zip','dist')"
curl -s -X POST -H "Authorization: Bearer $NETLIFY_TOKEN" -H "Content-Type: application/zip" \
  --data-binary @cc_dist.zip https://api.netlify.com/api/v1/sites/e5bbb7e7-35d3-4310-8358-dddfcfe1d3eb/deploys
```
Token goes in env var `NETLIFY_TOKEN` — never in files or git. The old token was pasted in chat; revoke it and make a new one.

## Done and live (verified in headless browser)
- Mood Board `/creator/mood-board`: save YT/Insta/FB/Snapchat/TikTok links, write ideas, "Edit with my idea" vs "Improve with AI", AI templates, marketplace (templates, trending audios, content ideas, hashtags)
- Service types: Videographer with Editor / Only Videographer / Only Editor (booking filter + provider signup)
- Budget slider up to ₹1 lakh (`/creator/book`)
- Facebook, Snapchat, TikTok added to signup platforms + footer
- Sell & Earn `/creator/sell` ("We Hear You. We Value You.", list content ideas / templates / hashtags / trendy audios)
- View Campaigns `/creator/campaigns` (Active Campaigns; Upload Content unlocks after brand deal finishes)
- Withdraw Earnings `/creator/earnings`
- Dashboard order: Book Services → Mood Board → Sell & Earn → View Campaigns → Withdraw Earnings (cards + sidebar)
- Refresh no longer logs you out (AuthContext reads session synchronously)
- Tailwind safelist for runtime color classes

## Written locally, NOT yet confirmed live (last deploy was interrupted)
"Make the demo fully clickable":
- `src/pages/InfoPage.tsx` — about, careers, blog, press, help, terms, privacy, contact, forgot-password
- `src/pages/SectionPage.tsx` — /creator/bookings, /provider/reviews, /brand/{campaigns,creators,analytics,billing}, /cc-tv/schedule, and a real 404
- `App.tsx` — routes for the above, ScrollToTop, DemoButtonFeedback (buttons with no handler show a "Preview" toast)
- Landing footer links now real; one-click demo login buttons (Creator/Provider/Brand) on `/login`; booking form submits
- Next: build, deploy, run `C:\Users\samaa\AppData\Local\Temp\cc_link_check.py` (expects `LINK_CHECK=PASS`)

## Open items
- creatorclap.com still points at a Squarespace parking page — repoint DNS to Netlify
- No GitHub repo yet; create `originaonxi/creator-clap` and link Netlify for auto-deploy
- `gh`: a stale `GH_TOKEN` env var breaks auth — use `env -u GH_TOKEN gh ...`
- AI / Buy / Sell / Withdraw are demos (no backend, no payments)
