import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const changePassword = async (email: string, newPassword: string) => {
  try {
    // 1. find user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. update password
    await prisma.user.update({
      where: { email },
      data: {
        passwordHash: hashedPassword,
      },
    });

    return { success: true, message: "Password changed successfully" };
  } catch (error) {
    console.error("changePassword error:", error);
    return { success: false, message: "Something went wrong" };
  }
};
