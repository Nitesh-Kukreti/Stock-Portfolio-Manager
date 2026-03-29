import { successResponse, errorResponse, HTTP_STATUS } from "@/utils/apiResponse";

export async function GET() {
  try {
    const response = successResponse("Logout successful", null, HTTP_STATUS.OK);
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
    return response;
  } catch (error) {
    console.error("Signout error:", error);
    return errorResponse("Internal server error", error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
