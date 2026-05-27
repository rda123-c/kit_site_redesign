# Hearts of Pine Giveaway — Setup Guide

This is everything you need to launch the giveaway page at **kit-na.com/giveaway**.

## What was added

| File | Purpose |
|---|---|
| `kit-website/giveaway.html` | The standalone landing page with the entry form. Uses the site's existing `variables.css` and `base.css` for brand tokens; all giveaway-specific CSS is inline. |
| `kit-website/_redirects` | Updated to map `/giveaway` → `/giveaway.html` so the URL is clean. |
| `kit-website/giveaway-AppsScript.gs` | The Google Apps Script that receives form submissions and writes them to a Sheet. **Do not deploy this with the site** — it's just the source code you paste into Apps Script. |
| `giveaway-assets/kit-giveaway-qr-black.png` | Standard black QR code, 820×820 PNG. Best for print. |
| `giveaway-assets/kit-giveaway-qr-blue.png` | KIT Blonde Blue QR with rounded modules. For digital / on-brand placements. |
| `giveaway-assets/kit-giveaway-qr-red.png` | KIT Blonde Red QR with rounded modules. Alternative accent option. |
| `giveaway-assets/kit-giveaway-qr.svg` | Vector SVG — scales perfectly for posters, table tents, can wraps. |

The page is **noindexed** (won't appear in Google), **not linked** in the site nav or footer, and **not in the sitemap** — only people who scan the QR (or know the URL) will find it.

---

## One-time setup — Google Sheet + Apps Script

### 1. Create the Google Sheet
1. Go to [sheets.new](https://sheets.new) to make a new Sheet.
2. Name it something like **"KIT Hearts of Pine Giveaway Entries"**.
3. (Optional) Rename the default tab to `Entries` — the script will create it if missing.

### 2. Bind the Apps Script
1. In the Sheet, click **Extensions → Apps Script**.
2. Delete any existing code in `Code.gs`.
3. Open `kit-website/giveaway-AppsScript.gs` from this project and paste the contents into the Apps Script editor.
4. Click the disk icon to save. Name the project (e.g., "Giveaway Webhook").

### 3. Write the header row
1. In the Apps Script editor, pick `setupHeaders` from the function dropdown (top toolbar).
2. Click **Run**. Authorize when prompted (Google will say it's unverified — click **Advanced → Go to (project) → Allow**).
3. Switch back to the Sheet. You should see the column headers in row 1.

### 4. Deploy as a web app
1. In Apps Script, click **Deploy → New deployment**.
2. Click the gear next to "Select type" → choose **Web app**.
3. Settings:
   - Description: `Giveaway form handler v1`
   - Execute as: **Me (your email)**
   - Who has access: **Anyone** (this is required — no Google login on the entry page)
4. Click **Deploy**, authorize, copy the **Web app URL** that appears (looks like `https://script.google.com/macros/s/AKfy.../exec`).

### 5. Wire the URL into the HTML
1. Open `kit-website/giveaway.html`.
2. Find this line (near the bottom, inside the `<script>` block):
   ```js
   var WEBHOOK_URL = 'PASTE_YOUR_APPS_SCRIPT_WEBHOOK_URL_HERE';
   ```
3. Replace `PASTE_YOUR_APPS_SCRIPT_WEBHOOK_URL_HERE` with the URL from step 4.
4. Save the file.

### 6. Test before going live
1. Open `giveaway.html` locally (or push to a Netlify preview branch).
2. Fill out the form with a test entry.
3. Confirm a new row appears in the Sheet within a second or two.

---

## Deploying to Netlify

Since the site is already on Netlify, just commit the new files and push:

```bash
cd "kit-website"
git add giveaway.html giveaway-AppsScript.gs giveaway-README.md _redirects
git commit -m "Add Hearts of Pine giveaway landing page"
git push
```

Netlify will auto-deploy. The page will be live at **https://kit-na.com/giveaway** (or whatever your custom domain is).

> Tip: the `.gs` file isn't used at runtime — it's just stored alongside the HTML for reference. You can keep it in the repo or move it out; either works.

---

## QR codes

Three styles, all encoding `https://kit-na.com/giveaway`:

- **kit-giveaway-qr-black.png** — universal, prints clearly on light backgrounds
- **kit-giveaway-qr-blue.png** — KIT Blonde Blue, rounded modules (modern, on-brand)
- **kit-giveaway-qr-red.png** — KIT Blonde Red, rounded modules (high contrast)
- **kit-giveaway-qr.svg** — vector source, scale to any size for print

All four use error correction level **H** (~30% redundancy), so they tolerate small logos/overlays and minor print damage.

**Print sizing recommendations:**
| Use | Min QR size |
|---|---|
| Coaster / can wrap | 0.8" / 20mm |
| Table tent / shelf talker | 1.2" / 30mm |
| Tasting event poster | 2"+ / 50mm+ |

---

## Updating the giveaway later

- **Change the prize copy?** Edit the headline and sub in `giveaway.html` (lines around `<section class="giveaway-hero">`).
- **Add/remove form fields?** Update both `giveaway.html` (the form HTML and the `payload` object) and the `HEADERS` array in `giveaway-AppsScript.gs`. Then redeploy the Apps Script (Deploy → Manage deployments → pencil → New version).
- **End the giveaway?** Either replace the form with a "Giveaway has ended — thanks for entering" message, or add a redirect in `_redirects`: `/giveaway  /  301`.

---

## Privacy / compliance notes

The page collects PII (name, email, phone, ZIP). A few things to consider:
- Confirm your privacy policy covers giveaway entries and the marketing opt-in.
- The footer mentions "21+ to win" in fine print — adjust if Hearts of Pine has different age rules for ticket recipients.
- Apps Script + Google Sheets is HIPAA-not-applicable but is a reasonable store for marketing PII. If volume grows or you start storing more sensitive data, consider moving to a CRM (HubSpot, Klaviyo) via webhook instead.
