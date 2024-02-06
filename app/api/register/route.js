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
		const { fullname, email, city, address, password } =
			await req.json();
		await connectDb();
		const hashedPass = await bcrypt.hash(password, 10);
		const newUser = new User({
			fullname,
			email,
			city,
			address,
			password: hashedPass,
		});

		await newUser.save();
		return NextResponse.json(
			{
				status: true,
				message: 'User Registered Successfully',
				token: generateToken(newUser._id),
			},
			{ status: 201 },
		);
	} catch (err) {
		return NextResponse.json(
			{ status: false, message: 'Error while registering' },
			{ status: 500 },
		);
	}
}
