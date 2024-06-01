import { Suspense } from "react";
import { getProfile } from "@/app/lib/getProfile";
import Image from "next/image";
import Link from "next/link";

export default async function ProfileSnippet() {
	const res = await getProfile();
	const user: User = await res?.json();

	return (
		<div>
			<Suspense fallback={"loading.."}>
				<div>
					<Link href="/Profile">
						<Image
							src={user.thumbnailImg}
							alt="img"
							priority={false}
							loading="lazy"
							width={50}
							height={50}
							className="rounded-full aspect-square"
						/>
					</Link>
				</div>
			</Suspense>
		</div>
	);
}
