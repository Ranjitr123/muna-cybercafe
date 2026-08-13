export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { saveUserToFirebase } from '@/lib/firebaseService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, password } = body;

    if (!name || !email || !mobile || !password) {
      return NextResponse.json({ success: false, message: 'All registration fields are required' }, { status: 400 });
    }

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      mobile: mobile.trim(),
      password,
      role: 'customer',
      createdAt: new Date().toISOString(),
    };

    const result = await saveUserToFirebase(newUser);

    if (result.success) {
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
