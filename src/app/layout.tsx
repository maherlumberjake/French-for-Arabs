import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import NavBar from "@/components/navBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "French for Arabs",
	description: "better learning process",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} , dark:bg-dark dark:text-light text-dark bg-light`}
			>
				<NavBar />
				<main className="px-4 sm:px-8 md:px-12">{children}</main>
			</body>
		</html>
	);
}
