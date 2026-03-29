import { verifyOtp } from "@/helpers/verifyOtp";
import { errorResponse, successResponse, HTTP_STATUS } from "@/utils/apiResponse";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, type } = body;

    if (!email || !otp || !type) {
      return errorResponse("Email, OTP and type are required", null, HTTP_STATUS.BAD_REQUEST);
    }

    const result = await verifyOtp(email, otp, type);

    if (!result.success) {
      return errorResponse(result.message || "OTP verification failed", null, HTTP_STATUS.BAD_REQUEST);
    }

    if (type === "RESET_PASSWORD") {
      const resetToken = jwt.sign(
        { email, verified: true },
        process.env.JWT_SECRET as string,
        { expiresIn: "10m" },
      );
      return successResponse("OTP verified successfully", { token: resetToken }, HTTP_STATUS.OK);
    }

    if (type === "VERIFY_EMAIL") {
      const verifiedUser = await prisma.user.update({
        where: { email },
        data: { isVerified: true },
        select: { id: true, email: true, isVerified: true },
      });
      return successResponse("User verified successfully", verifiedUser, HTTP_STATUS.OK);
    }

    return errorResponse("Invalid OTP type", null, HTTP_STATUS.BAD_REQUEST);
  } catch (error) {
    console.error("Verify OTP error:", error);
    return errorResponse("Internal server error", null, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
