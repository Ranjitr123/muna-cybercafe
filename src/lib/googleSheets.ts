import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

interface SheetRowData {
  name: string;
  mobile: string;
  email: string;
  service: string;
  message: string;
  source?: string;
}

export async function appendToGoogleSheet(data: SheetRowData): Promise<{ success: boolean; message?: string }> {
  const webAppUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;

  // 1. Google Apps Script Web App Integration Method (GET + POST fallback)
  if (webAppUrl && webAppUrl.trim() !== '') {
    try {
      const queryParams = new URLSearchParams({
        name: data.name || '',
        mobile: data.mobile || '',
        email: data.email || '',
        service: data.service || '',
        message: data.message || '',
        source: data.source || 'Website Form',
      });

      // Method A: GET request with query params (immune to POST 302 redirect issues)
      const targetUrl = `${webAppUrl}${webAppUrl.includes('?') ? '&' : '?'}${queryParams.toString()}`;
      
      const response = await fetch(targetUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      console.log('[Google Apps Script GET Status]:', response.status);
      return { success: true, message: 'Saved via Google Apps Script Web App' };
    } catch (err: any) {
      console.error('[Google Apps Script Error]:', err?.message || err);
    }
  }

  // 2. Google Cloud Service Account Integration Method
  const sheetId = process.env.GOOGLE_SHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  let privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!sheetId || !clientEmail || !privateKey) {
    console.warn(
      '[Google Sheets API] Neither Apps Script URL nor Service Account credentials configured. Entry recorded in server logs:',
      {
        timestamp: new Date().toISOString(),
        ...data,
      }
    );
    return { success: true, message: 'Saved to server logs (Google Sheets pending config)' };
  }

  try {
    privateKey = privateKey.replace(/\\n/g, '\n');

    const serviceAccountAuth = new JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(sheetId, serviceAccountAuth);
    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const submissionDate = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    await sheet.addRow({
      Date: submissionDate,
      Name: data.name,
      Mobile: data.mobile,
      Email: data.email,
      Service: data.service,
      Message: data.message,
      Source: data.source || 'Website Contact Form',
    });

    return { success: true };
  } catch (error: any) {
    console.error('[Google Sheets API Error]:', error?.message || error);
    return { success: false, message: error?.message || 'Failed to append to Google Sheet' };
  }
}
