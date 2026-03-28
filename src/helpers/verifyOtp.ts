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
