export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getEnquiriesFromFirebase, getUsersFromFirebase, updateEnquiryStatusInFirebase } from '@/lib/firebaseService';

export async function GET(request: NextRequest) {
  try {
    const leads = await getEnquiriesFromFirebase();
    const users = await getUsersFromFirebase();
    return NextResponse.json({ success: true, leads, users }, { status: 200 });
  } catch (error: any) {
    console.error('[API Admin Leads GET Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch admin data from Firebase' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, status } = body;

    if (!leadId || !status) {
      return NextResponse.json({ success: false, message: 'leadId and status are required' }, { status: 400 });
    }

    const updated = await updateEnquiryStatusInFirebase(leadId, status);
    return NextResponse.json({ success: updated, leadId, status }, { status: 200 });
  } catch (error: any) {
    console.error('[API Admin Leads PATCH Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to update lead status' }, { status: 500 });
  }
}
