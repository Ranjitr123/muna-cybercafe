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
  sheetName?: string;
}

export async function appendToGoogleSheet(data: SheetRowData): Promise<{ success: boolean; message?: string }> {
  const webAppUrl = process.env['GOOGLE_SHEET_WEB_APP_URL'];

  // Determine target sheet tab name ('Form enquiry' vs 'customer request')
  let targetSheetName = data.sheetName;
  if (!targetSheetName) {
    if (data.action === 'contact_enquiry' || (data.source && data.source.toLowerCase().includes('contact'))) {
      targetSheetName = 'Form enquiry';
    } else {
      targetSheetName = 'customer request';
    }
  }

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
        action: data.action || (targetSheetName === 'customer request' ? 'service_request' : 'contact_enquiry'),
        sheet: targetSheetName,
        sheetName: targetSheetName,
        targetSheet: targetSheetName,
        tab: targetSheetName,
      });

      const targetUrl = `${webAppUrl}${webAppUrl.includes('?') ? '&' : '?'}${queryParams.toString()}`;

      const response = await fetch(targetUrl, {
        method: 'GET',
        redirect: 'follow',
      });

      console.log(`[Google Apps Script GET Status for ${data.source} -> Sheet: "${targetSheetName}"]:`, response.status);
      return { success: true, message: `Saved to ${targetSheetName} via Google Apps Script` };
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
      `[Excel / Google Sheet Log] Target Tab: "${targetSheetName}" | Event recorded:`,
      {
        timestamp: new Date().toISOString(),
        ...data,
      }
    );
    return { success: true, message: `Recorded in logs for ${targetSheetName}` };
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

    let sheet = doc.sheetsByTitle[targetSheetName] || doc.sheetsByTitle['customer request'];
    if (!sheet) {
      sheet = doc.sheetsByIndex[1] || doc.sheetsByIndex[0];
    }

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
