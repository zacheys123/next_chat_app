import { connectDb } from '@/lib/connectDb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { COOKIE_NAME, MAX_AGE } from '@/constants';
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.SECRET, {
		expiresIn: MAX_AGE,
	});
};

export async function POST(req) {
	try {
		await connectDb();
		const { fullname, email, city, username, password, cpassword } =
			await req.json();

		const exists = await User.findOne({
			$or: [{ email }, { username }],
		});

		if (!exists) {
			if (password === cpassword) {
				if (password.length >= 8 && username.length >= 8) {
					const hashedPass = await bcrypt.hash(password, 10);
					const newUser = await User.create({
						email,
						fullname,
						city,
						username,
						password: hashedPass,
					});
					const token = generateToken(newUser._id);
					const serialized = serialize(COOKIE_NAME, token, {
						httpOnly: true,
						secure: process.env.NODE_ENV == 'production',
						sameSite: 'strict',
						maxAge: MAX_AGE,
						path: '/',
					});
					return NextResponse.json(
						{
							status: true,
							message: 'User Registered Successfully',
							result: newUser,
							token,
						},
						{ headers: { 'Set-Cookie': serialized } },
						{ status: 201 },
					);
				} else {
					return NextResponse.json(
						{
							status: true,
							message:
								'Username and Password must have more than 8 characters',
						},
						{ status: 403 },
					);
				}
			} else {
				return NextResponse.json(
					{
						status: true,
						message: 'Both Passwords should match',
					},
					{ status: 403 },
				);
			}
		} else {
			return NextResponse.json(
				{
					status: true,
					message: 'Email/Username Exists,choose another',
				},
				{ status: 403 },
			);
		}
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ status: false, message: 'Error while registering user' },
			{ status: 500 },
		);
	}
}
