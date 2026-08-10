import { NextResponse } from 'next/server';
import { GovtNotice } from '@/components/GovtUpdatesTicker';

export const dynamic = 'force-dynamic';

function cleanDeadlineDate(rawDateStr: string): string {
  if (!rawDateStr) return 'Open';
  const str = String(rawDateStr).trim();

  // Clean long JS Date strings from Google Sheets (e.g. Mon Sep 07 2026 00:00:00 GMT+0530)
  if (str.includes('GMT') || str.includes('India Standard Time')) {
    try {
      const parsed = new Date(str);
      if (!isNaN(parsed.getTime())) {
        return parsed.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        });
      }
    } catch (e) {}
  }
  return str;
}

// Dynamic API Endpoint fetching directly from Google Sheets CMS
export async function GET() {
  const webAppUrl = process.env.GOOGLE_SHEET_WEB_APP_URL;

  if (webAppUrl && webAppUrl.trim() !== '') {
    try {
      const fetchUrl = `${webAppUrl}${webAppUrl.includes('?') ? '&' : '?'}action=getNotices&t=${Date.now()}`;
      const response = await fetch(fetchUrl, {
        method: 'GET',
        redirect: 'follow',
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        if (data && data.success && Array.isArray(data.notices) && data.notices.length > 0) {
          const cleanedNotices: GovtNotice[] = data.notices.map((n: any) => ({
            ...n,
            deadline: cleanDeadlineDate(n.deadline),
          }));

          return NextResponse.json(
            {
              success: true,
              count: cleanedNotices.length,
              notices: cleanedNotices,
              source: 'Google Sheets CMS',
            },
            {
              status: 200,
              headers: {
                'Cache-Control': 'no-store, no-cache, must-revalidate',
              },
            }
          );
        }
      }
    } catch (err: any) {
      console.warn('[Google Sheets Notices Error]:', err?.message || err);
    }
  }

  return NextResponse.json(
    {
      success: true,
      count: 0,
      notices: [],
      source: 'Google Sheets Pending Rows',
    },
    { status: 200 }
  );
}
