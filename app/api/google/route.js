import { COOKIE_NAME } from "@/constants";
import { connectDb } from "@/lib/connectDb";
import User from "@/models/user";
import { serialize } from "cookie";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { firstname, secondname, email, token, expires } = await req.json();
  console.log(firstname);
  try {
    await connectDb();

    const newUser = new User({
      firstname,
      secondname,
      email,
      username: firstname + "@" + secondname,
    });
    await newUser.save();
    const serialized = serialize(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: "strict",
      maxAge: expires,
      path: "/",
    });
    return NextResponse.json(
      {
        status: true,
        message: "User Registered Successfully",
        result: newUser,
        token,
      },
      { headers: { "Set-Cookie": serialized } },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        status: true,
        message: error,
      },
      { status: 500 }
    );
  }
}
