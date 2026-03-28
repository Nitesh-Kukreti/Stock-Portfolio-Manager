"use server";
import { prisma } from "@/lib/prisma";

type OtpPurpose = "VERIFY_EMAIL" | "RESET_PASSWORD" | "CHANGE_EMAIL";

export const sendOtp = async (email: string, type: OtpPurpose) => {
  try {
    // find user with the email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      console.log("⚠️  INVALID EMAIL  ⚠️ ");
      return { mesaage: "INVALID EMAIL", success: false };
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
    console.log({ message: "Error sending otp", Error: error });
    return { message: "Error sending otp", error };
  }
};
