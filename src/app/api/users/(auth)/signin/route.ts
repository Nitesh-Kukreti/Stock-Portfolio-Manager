import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse, HTTP_STATUS } from "@/utils/apiResponse";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    if (!email || !password) {
      return errorResponse("Missing required fields", null, HTTP_STATUS.BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return errorResponse("Invalid email or password", null, HTTP_STATUS.BAD_REQUEST);
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      return errorResponse("Invalid email or password", null, HTTP_STATUS.BAD_REQUEST);
    }

    const tokenData = {
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = successResponse("Login successful", null, HTTP_STATUS.OK);
    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Signin error:", error);
    return errorResponse("Internal server error", error, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}
