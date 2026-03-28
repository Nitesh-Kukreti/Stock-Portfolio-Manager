import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { changePassword } from "@/helpers/changePassword";
import { errorResponse } from "@/utils/apiResponse";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { token, newPassword } = body;

    if (!token || !newPassword) {
      return NextResponse.json({ message: "Missing data" }, { status: 400 });
    }

    // 🔹 1. Verify and Decode the token
    // This will throw an error if the token is expired or tampered with
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
      verified: boolean;
    };

    const email = decoded.email;

    // 1. validation
    if (!email || !newPassword) {
      return NextResponse.json(
        { message: "Email and new password are required" },
        { status: 400 },
      );
    }

    // if (newPassword.length < 6) {
   
    // return errorResponse("Password must be at least 6 characters", null, 400);
    // }

    // 2. call helper
    const result = await changePassword(email, newPassword);

    if (!result.success) {
      return NextResponse.json({ message: result.message }, { status: 400 });
    }

    return NextResponse.json({ message: result.message }, { status: 200 });
  } catch (error) {
    console.error("Change Password Route Error:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
