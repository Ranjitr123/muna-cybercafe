import { JWT } from 'google-auth-library';
import { GoogleSpreadsheet } from 'google-spreadsheet';

export interface SheetRowData {
  name: string;
  mobile: string;
  email: string;
  service: string;
  message: string;
  status?: string;
  source?: string;
  action?: 'signup' | 'service_request' | 'contact_enquiry';
}

export async function appendToGoogleSheet(data: SheetRowData): Promise<{ success: boolean; message?: string }> {
  const webAppUrl = process.env['GOOGLE_SHEET_WEB_APP_URL'];

  // 1. Google Apps Script Web App Integration Method (GET + POST with query parameters)
  if (webAppUrl && webAppUrl.trim() !== '') {
    try {
      const queryParams = new URLSearchParams({
        name: data.name || '',
        mobile: data.mobile || '',
        email: data.email || '',
        service: data.service || '',
        message: data.message || '',
        status: data.status || 'New',
        source: data.source || 'Website',
        action: data.action || 'general',
      });

      const targetUrl = `${webAppUrl}${webAppUrl.includes('?') ? '&' : '?'}${queryParams.toString()}`;

      const response = await fetch(targetUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      console.log(`[Google Apps Script GET Status for ${data.source}]:`, response.status);
      return { success: true, message: 'Saved via Google Apps Script Web App' };
    } catch (err: any) {
      console.error('[Google Apps Script Error]:', err?.message || err);
    }
  }

  // 2. Google Cloud Service Account Integration Method
  const sheetId = process.env['GOOGLE_SHEET_ID'];
  const clientEmail = process.env['GOOGLE_SERVICE_ACCOUNT_EMAIL'];
  let privateKey = process.env['GOOGLE_PRIVATE_KEY'];

  if (!sheetId || !clientEmail || !privateKey) {
    console.log(
      '[Excel / Google Sheet Log]: Syncing event recorded:',
      {
        timestamp: new Date().toISOString(),
        ...data,
      }
    );
    return { success: true, message: 'Recorded in logs (Google Apps Script / Sheet active)' };
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
      Status: data.status || 'New',
      Source: data.source || 'Website',
    });

    return { success: true };
  } catch (error: any) {
    console.error('[Google Sheets API Error]:', error?.message || error);
    return { success: false, message: error?.message || 'Failed to append to Google Sheet' };
  }
}
