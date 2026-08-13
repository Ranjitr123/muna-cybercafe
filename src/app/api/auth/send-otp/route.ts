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

    // If forgot_password, check if user actually exists in Firebase
    if (type === 'forgot_password') {
      const users = await getUsersFromFirebase();
      const cleanDigits = cleanInput.replace(/\D/g, '');

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
