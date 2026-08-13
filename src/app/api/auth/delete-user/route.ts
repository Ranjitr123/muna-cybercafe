export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { deleteUserFromFirebase } from '@/lib/firebaseService';

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userDocId = searchParams.get('id') || searchParams.get('userDocId') || searchParams.get('email') || '';

    if (!userDocId) {
      return NextResponse.json({ success: false, message: 'User document ID or email required' }, { status: 400 });
    }

    const deleted = await deleteUserFromFirebase(userDocId);

    if (deleted) {
      return NextResponse.json({ success: true, message: 'User account deleted successfully from Firebase' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to delete user account from Firebase' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[API Delete User Error]:', error);
    return NextResponse.json({ success: false, message: 'Server error deleting user' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userDocId, email } = body;
    const target = userDocId || email;

    if (!target) {
      return NextResponse.json({ success: false, message: 'User identification required' }, { status: 400 });
    }

    const deleted = await deleteUserFromFirebase(target);

    if (deleted) {
      return NextResponse.json({ success: true, message: 'User account deleted successfully from Firebase' }, { status: 200 });
    } else {
      return NextResponse.json({ success: false, message: 'Failed to delete user account' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[API Delete User POST Error]:', error);
    return NextResponse.json({ success: false, message: 'Server error deleting user' }, { status: 500 });
  }
}
