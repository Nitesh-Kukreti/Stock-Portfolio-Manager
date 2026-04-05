import { NextResponse } from "next/server";

/**
 * Standard HTTP status codes
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Success Response
 */
export const successResponse = (
  message: string,
  data: unknown = null,
  status: number
) => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      error: null,
    },
    { status }
  );
};

/**
 * Error Response
 */
export const errorResponse = (
  message: string,
  error: unknown = null,
  status: number 
) => {
  return NextResponse.json(
    {
      success: false,
      message,
      data: null,
      error:
        process.env.NODE_ENV === "development"
          ? error instanceof Error
            ? error.message
            : error
          : null,
    },
    { status }
  );
};