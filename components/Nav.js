'use client';

import { Avatar } from 'flowbite-react';
import Link from 'next/link';
import { TfiAlignRight } from 'react-icons/tfi';
export default function Nav() {
	return (
		<main className="flex bg-cyan-900 text-white items-center p-3 w-full md:justify-around justify-between bg-cyan-900">
			<div className="flex md:flex-start md:w-20 ">
				<span className=" bg-pink-100 text-red-500 font-bold p-1 rounded-b-xl shadow-red-500">
					GigMe
				</span>
				<span className="  font-bold p-1 shadow-blue-500">Up</span>
			</div>
			
			<div>
				<div className="hidden md:inline  ">
					{' '}
					<Link className="hidden md:inline px-3" href="/">
						Home
					</Link>
					<Link className="hidden md:inline px-3" href="/dashboard">
						dashboard
					</Link>
					<Link className="hidden md:inline px-3" href="/settings">
						about
					</Link>
				</div>
				<Link className="hidden md:inline px-3" href="/contact">
					Contact
				</Link>
				<div className="hidden md:hidden">
					{' '}
					<Link href="/gigme">Home</Link>
					<Link href="/dashboard">dashboard</Link>
					<Link href="/settings">settings</Link>{' '}
					<Link href="/gigme">Home</Link>
					<Link href="/dashboard">dashboard</Link>
					<Link href="/settings">settings</Link>
				</div>
			</div>
			<TfiAlignRight className="inline md:hidden w-5 h-5 mx-2 cursor-pointer hover:opacity-8 hover:bg-green" />
			<Avatar
				rounded
				className="rounded-lg hidden md:inline"
				status="online"
			/>
		</main>
	);
}
