'use client';

import Link from 'next/link';
export default function Nav() {
	return (
		<main className="flex bg-black text-white justify-around p-3">
			<Link href="/gigme">Home</Link>

			<Link href="/dashboard">dashboard</Link>
			<Link href="/settings">settings</Link>
		</main>
	);
}
