import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import placeHolderImg from "../../../public/avatar.png";
import { getProfile } from "@/app/lib/actions/users";

export default async function ProfileSnippet() {
	let user: User | undefined = undefined;
	try {
		user = await getProfile();

		if (!user?.name) {
			user = undefined;
		}
	} catch (error) {
		console.log("the error is " + error);
	}

	return (
		<div>
			<Suspense fallback={"loading.."}>
				<div>
					{user ? (
						<Link href="/Profile">
							<Image
								src={
									user.thumbnailImg != "noImg"
										? user.thumbnailImg
										: placeHolderImg
								}
								alt="img"
								priority={false}
								loading="lazy"
								width={50}
								height={50}
								className="rounded-full aspect-square"
							/>
						</Link>
					) : (
						<Link
							href="/signup"
							className=" !text-dark dark:!text-light hover:!text-main transition-colors font-bold"
						>
							Sign up
						</Link>
					)}
				</div>
			</Suspense>
		</div>
	);
}
