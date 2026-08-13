export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { authenticateUserWithFirebase } from '@/lib/firebaseService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { emailOrMobile, password, isAdmin } = body;

    if (!emailOrMobile || !password) {
      return NextResponse.json({ success: false, message: 'Email/Mobile and Password are required' }, { status: 400 });
    }

    const cleanInput = emailOrMobile.trim().toLowerCase();

    // Check Admin Login Credentials
    const isAdminIdentifier =
      cleanInput === 'ranjit' ||
      cleanInput === 'ranjitrautaray475@gmail.com' ||
      cleanInput === 'sanjit007muna@gmail.com' ||
      cleanInput === 'muna' ||
      cleanInput === '9777735527' ||
      isAdmin;

    if (isAdminIdentifier) {
      if (password === '123456' || password === 'admin123') {
        return NextResponse.json(
          {
            success: true,
            user: {
              id: 'admin-1',
              name: 'Ranjit Rautaray (Admin)',
              email: 'ranjitrautaray475@gmail.com',
              mobile: '9777735527',
              role: 'admin',
              createdAt: new Date().toISOString(),
            },
          },
          { status: 200 }
        );
      } else {
        return NextResponse.json({ success: false, message: 'Invalid admin credentials' }, { status: 401 });
      }
    }

    // Customer Firebase Authentication
    const result = await authenticateUserWithFirebase(emailOrMobile, password);

    if (result.success && result.user) {
      return NextResponse.json({ success: true, user: result.user }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: result.error || 'Invalid customer login credentials' }, { status: 401 });
    }
  } catch (error: any) {
    console.error('[API Auth Login Error]:', error);
    return NextResponse.json({ success: false, message: 'Authentication server error' }, { status: 500 });
  }
}
