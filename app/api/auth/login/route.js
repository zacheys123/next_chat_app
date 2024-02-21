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
	const { email, password } = await req.json();

	try {
		await connectDb();
		if (!email || !password || email === ' ' || password === '') {
			return NextResponse.json(
				{
					success: false,
					message: 'All fields are required',
				},
				{ status: 403 },
			);
		}
		const user = await User.findOne({ email });

		if (user) {
			const comparepassword = await bcrypt.compare(
				password,
				user.password,
			);

			if (comparepassword) {
				const token = generateToken(user._id);
				const serialized = serialize(COOKIE_NAME, token, {
					httpOnly: true,
					secure: process.env.NODE_ENV == 'production',
					sameSite: 'strict',
					maxAge: MAX_AGE,
					path: '/',
				});
				console.log(user);
				// const response = { message: 'Login Successfull' };
				// return new Response(JSON.stringify(response), {
				// 	token,
				// 	results: user,
				// 	status: 200,
				// 	headers: { 'Set-Cookie': serialized },
				// });
				return NextResponse.json(
					{
						status: true,
						message: 'Logged in  Successfully',
						results: user,
						token,
					},
					{ headers: { 'Set-Cookie': serialized } },
					{ status: 201 },
				);
			} else {
				console.log('invalid password');
				return NextResponse.json(
					{
						success: false,
						message: 'Invalid credentials',
					},
					{ status: 403 },
				);
			}
		} else {
			return NextResponse.json(
				{
					success: false,
					message: 'User Not Found,check your credentials',
				},
				{ status: 403 },
			);
		}
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{
				success: false,
				message: error,
			},
			{ status: 500 },
		);
	}
}
