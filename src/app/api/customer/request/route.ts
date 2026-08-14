export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { addCustomerServiceRequestToUser, getUsersFromFirebase } from '@/lib/firebaseService';
import { appendToGoogleSheet } from '@/lib/googleSheets';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email') || '';
    const mobile = searchParams.get('mobile') || '';

    if (!email && !mobile) {
      return NextResponse.json({ success: false, message: 'email or mobile query param required' }, { status: 400 });
    }

    const users = await getUsersFromFirebase();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.replace(/\D/g, '');

    const foundUser = users.find((u: any) => {
      const uEmail = (u.email || '').trim().toLowerCase();
      const uMobile = (u.mobile || '').replace(/\D/g, '');
      if (cleanEmail && uEmail) {
        return uEmail === cleanEmail;
      }
      if (cleanMobile && uMobile) {
        return uMobile === cleanMobile;
      }
      return false;
    });

    if (foundUser) {
      return NextResponse.json({ success: true, requests: foundUser.requests || [] }, { status: 200 });
    }

    return NextResponse.json({ success: true, requests: [] }, { status: 200 });
  } catch (error: any) {
    console.error('[API Customer Request GET Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch customer requests' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, mobile, service, message } = body;

    const userEmailOrMobile = email || mobile;
    if (!userEmailOrMobile || !service) {
      return NextResponse.json({ success: false, message: 'User identification and service are required' }, { status: 400 });
    }

    const result = await addCustomerServiceRequestToUser(userEmailOrMobile, { service, message });

    if (result.success) {
      // Look up registered user's actual Full Name, Email, and Mobile Number
      const users = await getUsersFromFirebase();
      const cleanInput = userEmailOrMobile.trim().toLowerCase();
      const cleanDigits = cleanInput.replace(/\D/g, '');

      const foundUser = users.find((u: any) => {
        const uEmail = (u.email || '').trim().toLowerCase();
        const uMobile = (u.mobile || '').replace(/\D/g, '');
        return (cleanInput.includes('@') && uEmail === cleanInput) || (cleanDigits && uMobile === cleanDigits);
      });

      const userName = foundUser?.name || 'Registered Customer';
      const userEmail = foundUser?.email || email || '';
      const userMobile = foundUser?.mobile || mobile || '';

      // Dual-sync: Append service request to Google Sheet / Excel with customer details
      appendToGoogleSheet({
        name: userName,
        email: userEmail,
        mobile: userMobile,
        service: service,
        message: message || '',
        status: 'New',
        source: 'Customer Dashboard Request',
        action: 'service_request',
        sheetName: 'customer request',
      }).catch((e) => console.warn('[Google Sheet Request Sync Error]:', e));

      return NextResponse.json({ success: true, id: result.id }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to add service request to user document in Firebase' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[API Customer Request POST Error]:', error);
    return NextResponse.json({ success: false, message: 'Server error processing request' }, { status: 500 });
  }
}
