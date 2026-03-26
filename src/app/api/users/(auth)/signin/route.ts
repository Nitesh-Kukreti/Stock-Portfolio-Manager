import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody; // get email and password from request body

    if (!email || !password) {
      // if any field is mmissing
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    // find user with with the help of email
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // if user with the email not found
    if (!user) {
      return NextResponse.json(
        { error: "invalid email or password" },
        { status: 400 },
      );
    }

    // check if the password valid
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    // if password is invalid
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "invalid email or password" },
        { status: 400 },
      );
    }

    //create token to store in the cookies which idicates that the user is loged in
    const tokenData = {
      // creating token data
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    };

    // createing encrypted token using env variable as a secret key
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d", // login session expires in 1 day
    });

    // creating response to send
    const response = NextResponse.json({
      message: "login successful",
      succcess: true,
    });

    // saving cookies in the users browser
    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
