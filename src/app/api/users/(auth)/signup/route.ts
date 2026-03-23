

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "~/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, fullName } = body;

    // 1. Basic Validation
    if (!email || !password || !fullName) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // 2. Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 },
      );
    }

    // 3. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create the user in PostgreSQL
    const newUser = await prisma.user.create({
      data: {
        email: email,
        fullName: fullName,
        passwordHash: hashedPassword,
      },
    });

    // 5. Success Response (Exclude password from the response)
    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: newUser.id,
          email: newUser.email,
          fullName: newUser.fullName,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 },
    );
  }
}