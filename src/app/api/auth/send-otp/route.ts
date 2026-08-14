export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { getUsersFromFirebase } from '@/lib/firebaseService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { recipient, type } = body; // type: 'signup' | 'forgot_password'

    if (!recipient) {
      return NextResponse.json({ success: false, message: 'Email address is required' }, { status: 400 });
    }

    const cleanInput = recipient.trim().toLowerCase();

    // If forgot_password, verify that user account exists in Firebase Cloud Firestore
    if (type === 'forgot_password') {
      const users = await getUsersFromFirebase();
      const cleanDigits = cleanInput.replace(/\D/g, '');

      const found = users.find((u: any) => {
        const uEmail = (u.email || '').trim().toLowerCase();
        const uMobile = (u.mobile || '').replace(/\D/g, '');
        return (cleanInput.includes('@') && uEmail === cleanInput) || (cleanDigits && uMobile === cleanDigits);
      });

      if (!found) {
        return NextResponse.json({ success: false, message: 'No registered user found with this Email address.' }, { status: 404 });
      }
    }

    // Generate 6-digit OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Dispatch Email via Nodemailer SMTP if email address is provided
    const smtpHost = process.env['SMTP_HOST'] || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env['SMTP_PORT'] || '587', 10);
    const smtpUser = process.env['SMTP_USER'] || 'ranjitrautaray475@gmail.com';
    const smtpPass = process.env['SMTP_PASS'] || '';

    if (cleanInput.includes('@') && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Muna Tech World" <${smtpUser}>`,
          to: cleanInput,
          subject: `${generatedOtp} is your OTP Verification Code - Muna Tech World`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded-radius: 12px; background-color: #ffffff;">
              <div style="background-color: #1e3a8a; padding: 15px; text-align: center; border-radius: 8px; color: white;">
                <h2 style="margin: 0; font-size: 20px;">Muna Tech World</h2>
                <p style="margin: 4px 0 0 0; font-size: 12px; opacity: 0.9;">Online Services & Digital Hub • Nirakarpur, Odisha</p>
              </div>
              <div style="padding: 20px 0; text-align: center;">
                <h3 style="color: #334155; margin-bottom: 10px;">Verification Code</h3>
                <p style="color: #64748b; font-size: 14px; margin-bottom: 20px;">Use the following 6-digit OTP code to complete your ${type === 'forgot_password' ? 'password reset' : 'account registration'}:</p>
                <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #1d4ed8; background-color: #eff6ff; padding: 12px 24px; border-radius: 8px; display: inline-block; border: 1px border-blue-200;">
                  ${generatedOtp}
                </div>
                <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">This OTP is valid for 10 minutes. Please do not share this code with anyone.</p>
              </div>
              <div style="border-top: 1px solid #f1f5f9; padding-top: 12px; text-align: center; color: #94a3b8; font-size: 11px;">
                © Muna Tech World, Nanapada, Nirakarpur, Khordha, Odisha - 752019
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[SMTP Email Sent] OTP ${generatedOtp} sent to ${cleanInput}`);
      } catch (mailErr) {
        console.warn('[SMTP Email Error]:', mailErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        otp: generatedOtp,
        message: `6-Digit OTP verification code sent to email: ${cleanInput}`,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API Send OTP Error]:', error);
    return NextResponse.json({ success: false, message: 'Failed to generate OTP' }, { status: 500 });
  }
}
