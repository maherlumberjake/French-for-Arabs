import { getProfile } from "../lib/getProfile";
import Image from "next/image";

export default async function Profile() {
	const res = await getProfile();
	const user: User = await res?.json();
	return (
		<>
			<div className="grid grid-cols-1  w-60 justify-center items-center gap-4 p-4 mx-auto border-4 border-main rounded-md">
				<Image
					src={user.thumbnailImg}
					alt="user img"
					loading="lazy"
					width={200}
					height={200}
					className="aspect-square"
				/>
				<h1 className="text-xl text-main capitalize font-bold ">{user.name}</h1>
				<p className="text-lg capitalize ">{user.email}</p>
				<span className=" capitalize">honor points :{user.honorPoints}</span>
				<span className=" capitalize">
					quizzes solved :{user.solvedList?.length}
				</span>
			</div>
		</>
	);
}
