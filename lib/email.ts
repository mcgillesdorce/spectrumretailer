import { Resend } from "resend";

export async function sendPasswordResetEmail(
  toEmail: string,
  toName: string,
  resetUrl: string
) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "no-reply@hiws.io",
    to: toEmail,
    subject: "Reset your Spectrum Portal password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
        <div style="background: #0052A5; padding: 24px 32px; border-radius: 8px 8px 0 0;">
          <h1 style="color: #fff; margin: 0; font-size: 22px;">SPECTRUM</h1>
          <p style="color: #F6A623; margin: 4px 0 0; font-size: 12px; letter-spacing: 2px; font-weight: bold;">AUTHORIZED RESELLER</p>
        </div>
        <div style="background: #fff; padding: 32px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
          <h2 style="margin: 0 0 8px; color: #111827;">Hi ${toName},</h2>
          <p style="color: #6b7280; margin: 0 0 24px;">
            We received a request to reset your Agent Portal password.
            Click the button below — this link expires in <strong>1 hour</strong>.
          </p>
          <a href="${resetUrl}"
             style="display: inline-block; background: #0052A5; color: #fff; text-decoration: none;
                    padding: 12px 28px; border-radius: 6px; font-weight: bold; font-size: 15px;">
            Reset Password
          </a>
          <p style="color: #9ca3af; font-size: 13px; margin: 24px 0 0;">
            If you didn't request this, you can safely ignore this email.
          </p>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0 16px;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">
            Or copy this link: <span style="color: #6b7280;">${resetUrl}</span>
          </p>
        </div>
      </div>
    `,
  });
}
