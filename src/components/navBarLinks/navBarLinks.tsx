import { cookies } from "next/headers";
import Link from "next/link";

import ProfileSnippet from "../profilesnippet/profileSnippet";

export default function NavBarLinks() {
	return (
		<ul className="flex gap-4 sm:gap-12  items-center">
			<li>
				<Link
					href="/quizzess?page=1"
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
					Articles
				</Link>
			</li>
			<li>
				<ProfileSnippet />
			</li>
		</ul>
	);
}
