import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    // get user id from saved token
    const userId = await getDataFromToken(request);

    // get user from database using userid
    const userDetails = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        isVerified: true
      },
    });

    return NextResponse.json({
      message: "User found",
      data: userDetails,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
