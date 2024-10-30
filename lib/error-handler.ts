import { NextResponse } from "next/server";
import { CustomError } from "@/errors/custom-error";

export const errorHandler = (error: unknown) => {
  if (error instanceof CustomError) {
    return NextResponse.json(
      {
        message: error.message,
        errorCode: error.errorCode,
        errors: error.errors,
      },
      { status: error.statusCode }
    );
  }

  console.error("Unexpected Error:", error);
  return NextResponse.json(
    { message: "Internal Server Error" },
    { status: 500 }
  );
};
