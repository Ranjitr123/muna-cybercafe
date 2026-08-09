# Cyber Café & Digital Service Center Website – Odisha

A modern, responsive, high-performance website built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS** for a Cyber Café / Digital Service Center located in **Odisha, India**, owned and managed by **Sanjit Rautaray**.

---

## 🌟 Business Overview

- **Owner / Manager:** Sanjit Rautaray
- **Mobile Number:** `+91 9777735527`
- **WhatsApp:** `https://wa.me/919777735527`
- **Location:** Odisha, India
- **Email:** `sanjit007muna@gmail.com`

---

## ⚡ Easiest Google Sheets Integration: Google Apps Script (Recommended)

Using **Google Apps Script** requires **NO API keys, NO Service Account JSON files, and NO Google Cloud Console configuration**.

### Step 1: Open Your Google Sheet
1. Open [Google Sheets](https://sheets.google.com) and create a new sheet named `Cyber Cafe Enquiries`.
2. Add these headers in **Row 1**:
   `Date` | `Name` | `Mobile` | `Email` | `Service` | `Message` | `Source`

### Step 2: Add Google Apps Script
1. Click **Extensions** -> **Apps Script** in the top menu.
2. Delete any existing code in the editor and paste the script below:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);
    
    var dateString = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
    
    sheet.appendRow([
      dateString,
      data.name || data.fullName || '',
      data.mobile || data.mobileNumber || '',
      data.email || '',
      data.service || '',
      data.message || '',
      data.source || 'Website Form'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

### Step 3: Deploy as Web App
1. Click **Deploy** (blue button top-right) -> **New deployment**.
2. Click the gear icon next to *Select type* and choose **Web app**.
3. Fill in:
   - **Description**: `Cyber Cafe Form Web App`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone` *(Crucial!)*
4. Click **Deploy** and grant authorization permissions.
5. Copy the generated **Web App URL** (starts with `https://script.google.com/macros/s/.../exec`).

### Step 4: Add to `.env.local`
In `.env.local` or Netlify Environment Variables:
```env
GOOGLE_SHEET_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

---

## 🛠️ Local Development & Deployment

```bash
# Start dev server
npm run dev

# Build for production
npm run build
```
