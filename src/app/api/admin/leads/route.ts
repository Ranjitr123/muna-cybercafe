export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getEnquiriesFromFirebase } from '@/lib/firebaseService';

export async function GET(request: NextRequest) {
  try {
    const leads = await getEnquiriesFromFirebase();
    return NextResponse.json({ success: true, count: leads.length, data: leads }, { status: 200 });
  } catch (error: any) {
    console.error('[API Admin Leads Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch leads from Firebase' }, { status: 500 });
  }
}
