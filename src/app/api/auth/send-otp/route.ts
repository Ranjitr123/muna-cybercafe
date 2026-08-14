export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getUsersFromFirebase } from '@/lib/firebaseService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipient, type } = body; // type: 'signup' | 'forgot_password'

    if (!recipient) {
      return NextResponse.json({ success: false, message: 'Email or Mobile recipient is required' }, { status: 400 });
    }

    const cleanInput = recipient.trim().toLowerCase();
    const cleanDigits = recipient.replace(/\D/g, '');

    // If forgot_password, check if user actually exists in Firebase
    if (type === 'forgot_password') {
      const users = await getUsersFromFirebase();

      const found = users.find((u: any) => {
        const uEmail = (u.email || '').trim().toLowerCase();
        const uMobile = (u.mobile || '').replace(/\D/g, '');
        return (cleanInput.includes('@') && uEmail === cleanInput) || (cleanDigits && uMobile === cleanDigits);
      });

      if (!found) {
        return NextResponse.json({ success: false, message: 'No registered user found with this Email or Mobile Number.' }, { status: 404 });
      }
    }

    // Generate 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Trigger Real SMS to Indian Mobile Number if FAST2SMS_API_KEY is configured
    const fast2smsApiKey = process.env['FAST2SMS_API_KEY'] || process.env['SMS_API_KEY'];
    if (fast2smsApiKey && cleanDigits.length === 10) {
      try {
        const smsRes = await fetch(
          `https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsApiKey}&route=otp&variables_values=${generatedOtp}&flash=0&numbers=${cleanDigits}`,
          { method: 'GET' }
        );
        const smsJson = await smsRes.json();
        console.log(`[Fast2SMS Dispatch Response]:`, smsJson);
      } catch (smsErr) {
        console.warn('[Fast2SMS Dispatch Error]:', smsErr);
      }
    }

    console.log(`[OTP GENERATED] Type: ${type}, Recipient: ${recipient}, OTP: ${generatedOtp}`);

    return NextResponse.json(
      {
        success: true,
        otp: generatedOtp,
        message: `6-Digit OTP verification code sent to ${recipient}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API Send OTP Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to generate OTP' }, { status: 500 });
  }
}
