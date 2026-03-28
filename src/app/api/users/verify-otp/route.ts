import { NextResponse } from "next/server";
import { verifyOtp } from "@/helpers/verifyOtp";
import { errorResponse, successResponse } from "@/utils/apiResponse";
import jwt from "jsonwebtoken"; // 1. Import JWT
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, otp, type } = body;

    if (!email || !otp || !type) {
      return errorResponse("Email, OTP and type are required", null, 400);
    }

    const result = await verifyOtp(email, otp, type);

    if (!result.success) {
      return errorResponse(
        result.message || "OTP verification failed",
        null,
        400,
      );
    }

    // 2. Generate token ONLY if the type is 'FORGOT_PASSWORD' (or your specific enum)
    let resetToken = null;
    if (type === "RESET_PASSWORD") {
      resetToken = jwt.sign(
        { email, verified: true },
        process.env.JWT_SECRET as string,
        { expiresIn: "10m" }, // Short-lived
      );

      return successResponse(
        "OTP verified successfully",
        { token: resetToken },
        200,
      );
    } else if (type === "VERIFY_EMAIL") {
      const verifiedUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: {
          isVerified: true,
        },
        select: {
          id: true,
          email: true,
          isVerified: true,
          passwordHash: false
        },
      });
      return successResponse("user verified successfully", verifiedUser, 200);
    }

    // 3. Return the token in the success response
  } catch (error) {
    console.error("Verify OTP Route Error:", error);
    return errorResponse("Internal Server Error", null, 500);
  }
}
