import { cookies } from "next/headers";
import Link from "next/link";

import ProfileSnippet from "../profilesnippet/profileSnippet";

export default function NavBarLinks() {
	return (
		<ul className="flex gap-4 sm:gap-12  items-center">
			<li>
				<Link
					href="/quizzess"
					className=" !text-dark dark:!text-light hover:!text-main transition-colors font-bold"
				>
					Quizzes
				</Link>
			</li>
			<li>
				<Link
					href="/articles"
					className=" !text-dark dark:!text-light hover:!text-main transition-colors font-bold"
				>
					Aricles
				</Link>
			</li>
			<li>
				{cookies().get("token") ? (
					<ProfileSnippet />
				) : (
					<Link
						href="/signup"
						className=" !text-dark dark:!text-light hover:!text-main transition-colors font-bold"
					>
						Sign up
					</Link>
				)}
			</li>
		</ul>
	);
}
