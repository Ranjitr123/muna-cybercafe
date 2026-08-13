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

    // Check if user is logging in via Admin Portal tab or using Admin identifier
    const isAdminIdentifier =
      isAdmin ||
      cleanInput === 'ranjit' ||
      cleanInput === 'ranjitrautaray475@gmail.com' ||
      cleanInput === 'sanjit007muna@gmail.com' ||
      cleanInput === 'muna' ||
      cleanInput === '9777735527';

    const validAdminPasswords = ['123456', 'Ranjit@123', 'admin123', 'muna007', 'muna123'];

    if (isAdminIdentifier) {
      // 1. Direct pass check for known admin passwords (including Ranjit@123 & 123456)
      if (validAdminPasswords.includes(password)) {
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
      }

      // 2. Live Firebase user authentication check for Admin
      const fbResult = await authenticateUserWithFirebase(emailOrMobile, password);
      if (fbResult.success && fbResult.user) {
        return NextResponse.json(
          {
            success: true,
            user: {
              ...fbResult.user,
              role: 'admin',
            },
          },
          { status: 200 }
        );
      }

      return NextResponse.json({ success: false, message: 'Invalid admin password' }, { status: 401 });
    }

    // Customer Firebase Authentication
    const result = await authenticateUserWithFirebase(emailOrMobile, password);

    if (result.success && result.user) {
      return NextResponse.json({ success: true, user: result.user }, { status: 200 });
    }

    return NextResponse.json({ success: false, message: result.error || 'Invalid credentials' }, { status: 401 });
  } catch (error: any) {
    console.error('[API Auth Login Error]:', error);
    return NextResponse.json({ success: false, message: 'Authentication server error' }, { status: 500 });
  }
}
