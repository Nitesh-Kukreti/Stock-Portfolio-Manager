import { sendOtp } from "@/helpers/sendOtp";
import { errorResponse, successResponse, HTTP_STATUS } from "@/utils/apiResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, type } = body;

    if (!email || !type) {
      return errorResponse("Email and type are required", null, HTTP_STATUS.BAD_REQUEST);
    }

    const result = await sendOtp(email, type);

    if (!result.success) {
      return errorResponse(result.message || "Failed to send OTP", null, HTTP_STATUS.BAD_REQUEST);
    }

    return successResponse("OTP sent successfully", null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Send OTP error:", error);
    return errorResponse("Internal server error", error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
