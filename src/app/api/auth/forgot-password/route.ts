export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { updateUserPasswordInFirebase } from '@/lib/firebaseService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipient, newPassword } = body;

    if (!recipient || !newPassword) {
      return NextResponse.json({ success: false, message: 'Recipient and New Password are required' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ success: false, message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const updated = await updateUserPasswordInFirebase(recipient, newPassword);

    if (updated) {
      return NextResponse.json({ success: true, message: 'Password updated successfully in Firebase!' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to update password in Firebase.' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[API Forgot Password Error]:', error);
    return NextResponse.json({ success: false, message: 'Forgot password server error' }, { status: 500 });
  }
}
