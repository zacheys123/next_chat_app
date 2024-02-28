"use client"
import React from 'react';
import { useGlobalContext } from '../Context/store';
function MainApp() {
	const{authstate:{mainUser}} = useGlobalContext()

	return (
		<main className="h-screen w-100 overflow-y-auto bg-black">
			<h2 className="text-white font-bold">Welcome to Gig Me App</h2>
		</main>
	);
}

export default MainApp;
