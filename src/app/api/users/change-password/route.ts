import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, HTTP_STATUS } from "@/utils/apiResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userId = await getDataFromToken(request);

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return errorResponse("User not found", null, HTTP_STATUS.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(
      body.currentPassword,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      return errorResponse("Invalid current password", null, HTTP_STATUS.BAD_REQUEST);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hashedPassword },
    });

    return successResponse("Password changed successfully", null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Change password error:", error);
    return errorResponse("Internal server error", error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
