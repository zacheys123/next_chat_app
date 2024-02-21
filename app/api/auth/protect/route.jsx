import { COOKIE_NAME } from '@/constants';
import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
// import { COOKIE_NAME } from '@/constants';
export async function GET() {
	const cookieStore = cookies();
	const token = cookieStore.get(COOKIE_NAME);
	if (!token) {
		return NextResponse.json(
			{
				message: 'Unauthorized',
			},
			{
				status: 401,
			},
		);
	}
	const { value } = token;

	try {
		verify(value, process.env.SECRET);
		return NextResponse.json(
			{
				user: 'Authorized',
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		return NextResponse.json(
			{
				message: `error, ${error}`,
			},
			{
				status: 500,
			},
		);
	}
}
