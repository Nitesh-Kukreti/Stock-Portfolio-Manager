import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  HTTP_STATUS,
} from "@/lib/utils/apiResponse";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName } = body;

    if (!email || !password || !fullName) {
      return errorResponse(
        "Missing required fields",
        null,
        HTTP_STATUS.BAD_REQUEST,
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return errorResponse(
        "User with this email already exists",
        null,
        HTTP_STATUS.CONFLICT,
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: { email, fullName, passwordHash: hashedPassword },
    });

    return successResponse(
      "User created successfully",
      {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
      },
      HTTP_STATUS.CREATED,
    );
  } catch (error) {
    console.error("Signup error:", error);
    return errorResponse(
      "Internal server error",
      error,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
    );
  }
}
