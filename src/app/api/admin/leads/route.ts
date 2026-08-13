export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { getEnquiriesFromFirebase, getUsersFromFirebase, updateUserServiceRequestStatus, updateEnquiryStatusInFirebase } from '@/lib/firebaseService';

export async function GET(request: NextRequest) {
  try {
    const leads = await getEnquiriesFromFirebase();
    const users = await getUsersFromFirebase();

    // Flatten all service requests attached to user documents
    const userRequests: any[] = [];
    users.forEach((u: any) => {
      if (Array.isArray(u.requests)) {
        u.requests.forEach((req: any) => {
          userRequests.push({
            userDocId: u.id,
            userName: u.name,
            userMobile: u.mobile,
            userEmail: u.email,
            requestId: req.id,
            service: req.service,
            message: req.message,
            status: req.status || 'New',
            createdAt: req.createdAt,
          });
        });
      }
    });

    return NextResponse.json({ success: true, leads, users, userRequests }, { status: 200 });
  } catch (error: any) {
    console.error('[API Admin Leads GET Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to fetch admin data from Firebase' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { userDocId, requestId, leadId, status } = body;

    if (!status) {
      return NextResponse.json({ success: false, message: 'status is required' }, { status: 400 });
    }

    let updated = false;
    if (userDocId && requestId) {
      updated = await updateUserServiceRequestStatus(userDocId, requestId, status);
    } else if (leadId) {
      updated = await updateEnquiryStatusInFirebase(leadId, status);
    }

    return NextResponse.json({ success: updated, status }, { status: 200 });
  } catch (error: any) {
    console.error('[API Admin Leads PATCH Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to update request status' }, { status: 500 });
  }
}
