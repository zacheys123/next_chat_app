import { Inter } from 'next/font/google';
import './globals.css';
import Nav from '@/components/Nav';
import { GlobalProvider } from './Context/store';
export const metadata = {
	title: 'gigMe app',
	description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<div className="min-h-screen justify-center items-center ">
					<GlobalProvider>{children}</GlobalProvider>
					
				</div>
			</body>
		</html>
	);
}
