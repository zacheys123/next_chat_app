import { connectDb } from '@/lib/connectDb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const generateToken = (id) => {
	return jwt.sign({ id }, process.env.NEXT_PUBLIC_SECRET, {
		expiresIn: '30d',
	});
};
export async function POST(req) {
	try {
		await connectDb();
		const { fullname, email, city, username, password } =
			await req.json();
		const exists = await User.findOne({
			$or: [{ email }, { username }],
		});
		if (exists) {
			return NextResponse.json(
				{
					status: true,
					message: 'Email/Username Exists,choose another',
				},
				{ status: 403 },
			);
		}
		const hashedPass = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			email,
			fullname,

			city,
			username,
			password: hashedPass,
		});

		console.log(newUser?.email);

		return NextResponse.json(
			{
				status: true,
				message: 'User Registered Successfully',
				token: generateToken(newUser._id),
			},
			{ status: 201 },
		);
	} catch (err) {
		console.log(err);
		return NextResponse.json(
			{ status: false, message: 'Error while registering user' },
			{ status: 500 },
		);
	}
}
