import { connectDb } from "@/lib/connectDb";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import { COOKIE_NAME, MAX_AGE } from "@/constants";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    expiresIn: MAX_AGE,
  });
};

export async function POST(req) {
  try {
    await connectDb();
    const {
      firstname,
      secondname,
      instrument,
      experience,
      age,
      city,
      phone,
      email,
      email2,
      username,
      password,
      cpassword,
    } = await req.json();

    if (
      !firstname ||
      !secondname ||
      !instrument ||
      !experience ||
      !age ||
      !city ||
      !phone ||
      !email2 ||
      !email ||
      !username ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        { status: 403 }
      );
    }
    const exists = await User.findOne({
      $or: [{ email }, { username }, { email2 }],
    });

    if (!exists) {
      if (password === cpassword) {
        if (password.length >= 8 && username.length >= 8) {
          const hashedPass = await bcrypt.hash(password, 10);
          const newUser = await User.create({
            firstname,
            secondname,
            instrument,
            experience,
            age,
            city,
            phone,
            email,
            emailtwo: email2,
            username,
            password: hashedPass,
          });
          const token = generateToken(newUser._id);
          const serialized = serialize(COOKIE_NAME, token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == "production",
            sameSite: "strict",
            maxAge: MAX_AGE,
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
        } else {
          return NextResponse.json(
            {
              status: true,
              message: "Username and Password must have more than 8 characters",
            },
            { status: 403 }
          );
        }
      } else {
        return NextResponse.json(
          {
            status: true,
            message: "Both Passwords should match",
          },
          { status: 403 }
        );
      }
    } else {
      return NextResponse.json(
        {
          status: true,
          message: "Email/Username Exists,choose another",
        },
        { status: 403 }
      );
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { status: false, message: "Error while registering user" },
      { status: 500 }
    );
  }
}
