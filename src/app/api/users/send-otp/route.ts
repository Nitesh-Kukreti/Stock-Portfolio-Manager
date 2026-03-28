import { NextResponse } from "next/server";
import { sendOtp } from "@/helpers/sendOtp";
import { errorResponse, successResponse } from "@/utils/apiResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, type } = body;

    // 🔹 Basic validation
    if (!email || !type) {
        return errorResponse("Email and type are required", null, 400);
    }

    // 🔹 Call helper
    const result = await sendOtp(email, type);

    if (!result.success) {
      return NextResponse.json(
        { message: result.message || "Failed to send OTP" },
        { status: 400 },
      );
    }

    return successResponse("OTP sent successfully", null, 200);
  
  } catch (error) {
    console.error("Send OTP Route Error:", error);

    return errorResponse("Internal Server Error", error, 500);
    
  }
}
