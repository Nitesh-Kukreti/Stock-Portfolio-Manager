"use server";
import { prisma } from "@/lib/prisma";

type OtpPurpose = "VERIFY_EMAIL" | "RESET_PASSWORD" | "CHANGE_EMAIL";

export const verifyOtp = async (
  email: string,
  otp: string,
  purpose: OtpPurpose,
) => {
  const record = await prisma.verification.findFirst({
    where: { email: email, type: purpose },
    orderBy: { createdAt: "desc" },
  });

  if (!record) {
    return { success: false, message: "OTP not found" };
  }

  // Check expiry
  if (new Date() > record.expiresAt) {
    return { success: false, message: "OTP expired" };
  }

  // Check OTP
  if (record.hashedCode !== otp) {
    return { success: false, message: "Invalid OTP" };
  }

  // Delete OTP after successful verification
  await prisma.verification.delete({
    where: { id: record.id },
  });

  return { success: true };
};

export const sendOtp = async (email: string, type: OtpPurpose) => {
  try {
    // find user with the email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      console.warn("Send OTP: invalid email attempted -", email);
      return { message: "Invalid email", success: false };
    }

    // 1. Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 2. Expiry (5 minutes)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 3. (Optional but recommended) delete old OTPs for same email + purpose
    await prisma.verification.deleteMany({
      where: {
        email: email,
        type: type,
      },
    });

    // 4. Store OTP in DB
    await prisma.verification.create({
      data: {
        email: email,
        hashedCode: otp,
        type: type,
        expiresAt,
      },
    });

    return { message: "otp sent successfully", success: true };
  } catch (error: any) {
    console.error("Send OTP error:", error);
    return { message: "Error sending otp", success: false };
  }
};
