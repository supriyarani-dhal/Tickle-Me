import { resend } from "@/lib/resend";
import { render } from "@react-email/components";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/apiResponse";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
  email: string,
  userName: string,
  verifyCode: string
): Promise<ApiResponse> {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // My Gmail email address
      pass: process.env.GMAIL_PASSWORD, // My Gmail App password
    },
  });

  const emailHtml = await render(
    VerificationEmail({ userName, otp: verifyCode })
  );

  try {
    await transporter.sendMail({
      from: "process.env.GMAIL_USER",
      to: email,
      subject: "Tickle-Me verification code",
      html: emailHtml,
    });

    return { success: true, message: "Verification email send successfully" };
  } catch (emailError) {
    console.error("error sending verification email", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
