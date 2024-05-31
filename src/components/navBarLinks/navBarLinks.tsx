"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBarLinks() {
	const path = usePathname();

	return (
		<ul className="flex gap-4 sm:gap-12 ">
			<li>
				<Link
					href="/quizzess"
					className={`${
						path == "/quizzess" && "active !text-dark dark:!text-light"
					} hover:text-main transition-colors font-bold`}
				>
					Quizzes
				</Link>
			</li>
			<li>
				<Link
					href="/articles"
					className={`${
						path == "/articles" && "active  !text-dark dark:!text-light"
					} hover:text-main transition-colors font-bold`}
				>
					Aricles
				</Link>
			</li>
			<li>
				<Link
					href="/signup"
					className={`${
						(path == "/signup" || path == "logIn") &&
						"active  !text-dark dark:!text-light"
					} hover:text-main transition-colors font-bold`}
				>
					Sign up
				</Link>
			</li>
		</ul>
	);
}
