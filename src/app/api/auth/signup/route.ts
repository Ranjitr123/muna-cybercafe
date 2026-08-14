export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { saveUserToFirebase, getUsersFromFirebase } from '@/lib/firebaseService';
import { appendToGoogleSheet } from '@/lib/googleSheets';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, password } = body;

    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ success: false, message: 'All registration fields are required' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanMobile = mobile.replace(/\D/g, '');

    // Check for existing account with same email or mobile number
    const existingUsers = await getUsersFromFirebase();
    const isDuplicate = existingUsers.some((u: any) => {
      const uEmail = (u.email || '').trim().toLowerCase();
      const uMobile = (u.mobile || '').replace(/\D/g, '');
      return (cleanEmail && uEmail === cleanEmail) || (cleanMobile && uMobile === cleanMobile);
    });

    if (isDuplicate) {
      return NextResponse.json(
        { success: false, message: 'Account with this Email Address or Mobile Number already exists. Please log in.' },
        { status: 400 }
      );
    }

    const newUser = {
      name: name.trim(),
      email: cleanEmail,
      mobile: mobile.trim(),
      password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    const result = await saveUserToFirebase(newUser);

    if (result.success) {
      // Dual-sync: Append user registration record to Google Sheet / Excel
      appendToGoogleSheet({
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        service: 'User Account Created',
        message: 'Customer Registered',
        status: 'Active Customer',
        source: 'Customer Signup',
        action: 'signup',
        sheetName: 'customer request',
      }).catch((e) => console.warn('[Google Sheet Signup Sync Error]:', e));

      return NextResponse.json(
        {
          success: true,
          user: {
            id: result.id || `user-${Date.now()}`,
            name: newUser.name,
            email: newUser.email,
            mobile: newUser.mobile,
            role: newUser.role,
            createdAt: newUser.createdAt,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json({ success: false, message: 'Failed to save user to Firebase' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[API Auth Signup Error]:', error);
    return NextResponse.json({ success: false, message: 'Registration server error' }, { status: 500 });
  }
}
