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

## Verified 2026-10-05
- InfoPage / SectionPage / demo login buttons / footer links deployed (deploy `6ac4084887af0e5ef11ce2f4`)
- `C:\Users\samaa\AppData\Local\Temp\cc_link_check.py` → 51 pages, `LINK_CHECK=PASS`
- Redeploy any time: `bash C:/Users/samaa/AppData/Local/Temp/cc_deploy.sh` (reads NETLIFY_TOKEN, prints DEPLOY_STATE + live-vs-local bundle match)
- Sell & Earn: no Headings; Templates = Attach Template or Use Template (6 ready templates). Test: `cc_sell_check.py`
- CreatorClap Edits `/creator/edits` (packages, footage upload, style, delivery, order list), card right after Book Services. Test: `cc_edits_check.py`

## Open items
- creatorclap.com still points at a Squarespace parking page — repoint DNS to Netlify
- GitHub: https://github.com/originaonxi/creator-clap (public). Netlify not yet linked — Netlify → creatorclap → Site configuration → Build & deploy → Link repository
- `gh`: a stale `GH_TOKEN` env var breaks auth — use `env -u GH_TOKEN gh ...`
- AI / Buy / Sell / Withdraw are demos (no backend, no payments)
