import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import bcrypt from "bcryptjs";
import { prisma } from "~/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // getting user id using saved token in cookies
    const userId = await getDataFromToken(request);

    // getting user from the database
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Something went wrong" },
        { status: 400 },
      );
    }

    console.log(user?.passwordHash);

    // check is password valid
    const isPasswordValid = await bcrypt.compare(
      body.currentPassword,
      user.passwordHash,
    );

    // if password is invalid
    if (!isPasswordValid) {
      console.log("Invalid password");
      return NextResponse.json({ error: "Invalid passworrd" }, { status: 400 });
    }

    // encrypt new password to save in datase
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(body.newPassword, salt);

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash: hashedPassword,
      },
    });

    const response = NextResponse.json({
      message: "password changed successfully",
      success: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error while changing password",
      },
      { status: 500 },
    );
  }
}
