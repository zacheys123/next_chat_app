import { COOKIE_NAME } from '@/constants';
import { cookies } from 'next/headers';
// import { COOKIE_NAME } from '@/constants';
export async function GET() {
	const cookieStore = cookies();
	const token = cookieStore.get(COOKIE_NAME);
	console.log(token);
}
