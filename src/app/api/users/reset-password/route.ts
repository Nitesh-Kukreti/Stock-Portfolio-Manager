import jwt from "jsonwebtoken";
import { changePassword } from "@/helpers/changePassword";
import { successResponse, errorResponse, HTTP_STATUS } from "@/utils/apiResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return errorResponse("Missing required fields", null, HTTP_STATUS.BAD_REQUEST);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
      verified: boolean;
    };

    const result = await changePassword(decoded.email, newPassword);

    if (!result.success) {
      return errorResponse(result.message, null, HTTP_STATUS.BAD_REQUEST);
    }

    return successResponse(result.message, null, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Reset password error:", error);
    return errorResponse("Internal server error", error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
