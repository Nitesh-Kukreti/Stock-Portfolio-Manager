import { getDataFromToken } from "@/lib/utils/getDataFromToken";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  HTTP_STATUS,
} from "@/lib/utils/apiResponse";

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);

    const userDetails = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        isVerified: true,
      },
    });

    if (!userDetails) {
      return errorResponse("User not found", null, HTTP_STATUS.NOT_FOUND);
    }

    return successResponse("User found", userDetails, HTTP_STATUS.OK);
  } catch (error) {
    console.error("Get user error:", error);
    return errorResponse(
      "Internal server error",
      error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
}
