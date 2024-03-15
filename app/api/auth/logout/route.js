import { serialize } from "cookie";
import { NextResponse } from "next/server";
import { COOKIE_NAME, MAX_AGE } from "@/constants";
export async function POST(req) {
  // Set token to none and expire after 5 seconds
  const serialized = serialize(COOKIE_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    sameSite: "strict",
    maxAge: new Date(Date.now() - 5 * 1000),
    path: "/",
  });
  console.log(serialized);
  return NextResponse.json(
    {
      status: true,
      message: "Logged out  Successfully",
    },
    { headers: { "Delete-Cookie": serialized } },
    { status: 201 }
  );
}
