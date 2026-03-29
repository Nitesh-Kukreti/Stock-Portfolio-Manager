import { NextRequest } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse, HTTP_STATUS } from "@/utils/apiResponse";

export async function DELETE(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);

    await prisma.user.delete({
      where: { id: userId },
    });

    const response = successResponse("User deleted successfully", null, HTTP_STATUS.OK);
    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
  } catch (error) {
    console.error("Delete user error:", error);
    return errorResponse("Internal server error", error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
