/**
 * KIT NON-ALC — Hearts of Pine Giveaway Form Handler
 * ---------------------------------------------------
 * This Apps Script accepts POST submissions from giveaway.html and appends
 * each entry as a row in the bound Google Sheet.
 *
 * SETUP (do once):
 *   1. Open the Google Sheet that should receive entries.
 *   2. Extensions → Apps Script. Paste this file's contents into Code.gs.
 *   3. Click "Deploy" → "New deployment".
 *      - Type: Web app
 *      - Execute as: Me (your account)
 *      - Who has access: Anyone (no Google login required to submit)
 *   4. Authorize when prompted. Copy the resulting "Web app URL".
 *   5. Paste that URL into giveaway.html where it says PASTE_YOUR_APPS_SCRIPT_WEBHOOK_URL_HERE.
 *   6. (Optional) Run setupHeaders() once to write the header row to the sheet.
 *
 * RE-DEPLOYING after edits:
 *   - Deploy → Manage deployments → pencil icon → Version: "New version" → Deploy.
 *   - The Web app URL stays the same across new versions (so no need to update the HTML).
 */

// ---- CONFIG ----
var SHEET_NAME = 'Entries'; // Tab name in the bound spreadsheet
var HEADERS = [
  'Submitted At',
  'First Name',
  'Last Name',
  'Email',
  'Phone',
  'ZIP',
  'Marketing Opt-In',
  'Source',
  'User Agent'
];

/**
 * Handles POST requests from the giveaway form.
 */
function doPost(e) {
  try {
    // Body comes in as text/plain (see fetch in giveaway.html). Parse JSON manually.
    var data = JSON.parse(e.postData.contents);

    // Basic server-side validation — reject obviously empty submissions
    if (!data.email || !data.firstName) {
      return jsonResponse({ ok: false, error: 'missing required fields' }, 400);
    }

    var sheet = getOrCreateSheet_();
    sheet.appendRow([
      new Date(),
      String(data.firstName || '').slice(0, 100),
      String(data.lastName  || '').slice(0, 100),
      String(data.email     || '').slice(0, 200),
      String(data.phone     || '').slice(0, 50),
      String(data.zip       || '').slice(0, 10),
      String(data.marketingOptIn || 'No'),
      String(data.source    || ''),
      String(data.userAgent || '').slice(0, 500)
    ]);

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('Giveaway submit error:', err);
    return jsonResponse({ ok: false, error: String(err) }, 500);
  }
}

/**
 * Health check — visit the web app URL in a browser to confirm it's live.
 */
function doGet() {
  return jsonResponse({ ok: true, service: 'KIT Hearts of Pine Giveaway' });
}

/**
 * Run this ONCE manually to write the header row.
 * Apps Script editor → select setupHeaders → Run.
 */
function setupHeaders() {
  var sheet = getOrCreateSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
}

// ---- helpers ----

function getOrCreateSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
