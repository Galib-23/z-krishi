import { CustomError } from "@/errors/custom-error";
import { db } from "@/lib/db";
import { errorHandler } from "@/lib/error-handler";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { username, email, password } = await request.json();

    let user = await db.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new CustomError("User already exists", 401, "USER_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    return errorHandler(error);
  }
};
