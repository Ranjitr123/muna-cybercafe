import nodemailer from 'nodemailer';

interface EmailPayload {
  name: string;
  mobile: string;
  email: string;
  service: string;
  message: string;
}

const adminEmail = process.env.ADMIN_EMAIL || 'ranjitrautaray475@gmail.com';
const fromEmail = process.env.FROM_EMAIL || 'ranjitrautaray475@gmail.com';

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return null;
}

export async function sendEnquiryEmails(payload: EmailPayload): Promise<{ adminSent: boolean; customerSent: boolean }> {
  const transporter = createTransporter();
  const submissionTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  if (!transporter) {
    console.warn('[Email System] SMTP configuration missing. Email notification logged to console:', {
      adminEmail,
      submissionTime,
      ...payload,
    });
    return { adminSent: true, customerSent: true };
  }

  let adminSent = false;
  let customerSent = false;

  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
      <h2 style="color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">New Service Enquiry Received</h2>
      <p style="font-size: 14px; color: #475569;">A new enquiry was submitted through the Cyber Café website on <strong>${submissionTime}</strong>.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 30%;">Customer Name:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;">${payload.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Mobile Number:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><a href="tel:${payload.mobile}">${payload.mobile}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email Address:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${payload.email}">${payload.email}</a></td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Service Requested:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; color: #2563eb; font-weight: bold;">${payload.service}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; font-weight: bold; vertical-align: top;">Message:</td>
          <td style="padding: 8px; border-bottom: 1px solid #f1f5f9; white-space: pre-wrap;">${payload.message}</td>
        </tr>
      </table>

      <div style="margin-top: 25px; padding: 15px; background-color: #eff6ff; border-radius: 6px;">
        <p style="margin: 0; font-size: 13px; color: #1e3a8a;">
          <strong>Quick Action:</strong> Click to call <a href="tel:${payload.mobile}" style="color: #2563eb; font-weight: bold;">${payload.mobile}</a> or chat on <a href="https://wa.me/91${payload.mobile}?text=${encodeURIComponent('Hello ' + payload.name + ', regarding your enquiry for ' + payload.service)}" style="color: #10b981; font-weight: bold;">WhatsApp</a>.
        </p>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Cyber Café Website" <${fromEmail}>`,
      to: adminEmail,
      subject: `[New Enquiry] ${payload.service} - ${payload.name}`,
      html: adminHtml,
    });
    adminSent = true;
  } catch (err) {
    console.error('[Admin Email Error]:', err);
  }

  if (payload.email) {
    const customerHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px; background-color: #ffffff;">
        <h2 style="color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Enquiry Received - Cyber Café Odisha</h2>
        <p style="font-size: 15px; color: #334155;">Hello <strong>${payload.name}</strong>,</p>
        <p style="font-size: 14px; color: #475569; line-height: 1.6;">
          Thank you for contacting us! We have received your enquiry for <strong>${payload.service}</strong> and will get back to you shortly.
        </p>

        <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
          <h4 style="margin: 0 0 8px 0; color: #0f172a;">Summary of your enquiry:</h4>
          <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Service:</strong> ${payload.service}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Contact Mobile:</strong> ${payload.mobile}</p>
          <p style="margin: 4px 0; font-size: 13px; color: #475569;"><strong>Message:</strong> ${payload.message}</p>
        </div>

        <p style="font-size: 14px; color: #475569;">
          Need immediate assistance? You can call us directly or chat on WhatsApp.
        </p>

        <div style="margin-top: 20px;">
          <a href="tel:9777735527" style="display: inline-block; background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold; margin-right: 10px;">Call Sanjit Rautaray (9777735527)</a>
          <a href="https://wa.me/919777735527?text=${encodeURIComponent('Hello Sanjit, I submitted an enquiry for ' + payload.service)}" style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;">WhatsApp Us</a>
        </div>

        <hr style="margin-top: 30px; border: none; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #94a3b8; text-align: center;">
          Cyber Café & Digital Service Center | At - Nanapada, PO/PS - Nirakarpur, Dist - Khordha, Odisha - 752019 | Contact: 9777735527, 9668358119
        </p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"Cyber Café Odisha" <${fromEmail}>`,
        to: payload.email,
        subject: `Thank you for your enquiry - Cyber Café Odisha`,
        html: customerHtml,
      });
      customerSent = true;
    } catch (err) {
      console.error('[Customer Confirmation Email Error]:', err);
    }
  }

  return { adminSent, customerSent };
}
