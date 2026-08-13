import { NextRequest, NextResponse } from 'next/server';
import { validateContactForm, sanitizeInput, ContactFormData } from '@/lib/validation';
import { appendToGoogleSheet } from '@/lib/googleSheets';
import { sendEnquiryEmails } from '@/lib/email';
import { saveEnquiryToFirebase } from '@/lib/firebaseService';

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // 1. Validate Form Inputs
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.errors,
          message: 'Please resolve the highlighted validation errors.',
        },
        { status: 400 }
      );
    }

    // 2. Sanitize Text Inputs
    const cleanName = sanitizeInput(body.fullName);
    const cleanMobile = sanitizeInput(body.mobileNumber);
    const cleanEmail = sanitizeInput(body.email);
    const cleanService = sanitizeInput(body.service);
    const cleanMessage = sanitizeInput(body.message);

    // 3. Save to Firebase Cloud Firestore
    const firebaseResult = await saveEnquiryToFirebase({
      name: cleanName,
      mobile: cleanMobile,
      email: cleanEmail,
      service: cleanService,
      message: cleanMessage,
      source: 'Website Contact Form',
    });

    // 4. Append to Google Sheets
    const sheetResult = await appendToGoogleSheet({
      name: cleanName,
      mobile: cleanMobile,
      email: cleanEmail,
      service: cleanService,
      message: cleanMessage,
      source: 'Website Contact Form',
    });

    // 5. Send Emails (Admin Notification + Customer Acknowledgement)
    const emailResult = await sendEnquiryEmails({
      name: cleanName,
      mobile: cleanMobile,
      email: cleanEmail,
      service: cleanService,
      message: cleanMessage,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Thank you! Your enquiry has been submitted successfully. We will contact you shortly.',
        data: {
          name: cleanName,
          mobile: cleanMobile,
          service: cleanService,
          firebaseSaved: firebaseResult.success,
          firebaseError: firebaseResult.error || null,
          sheetUpdated: sheetResult.success,
          adminNotified: emailResult.adminSent,
          customerNotified: emailResult.customerSent,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API Route Contact Error]:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong while processing your request. Please try again or contact us directly on WhatsApp.',
      },
      { status: 500 }
    );
  }
}
