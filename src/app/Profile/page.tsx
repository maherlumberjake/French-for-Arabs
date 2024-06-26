import { getProfile } from "../lib/actions/users";
import Image from "next/image";

export default async function Profile() {
	let user: User | undefined = undefined;
	try {
		user = await getProfile();
	} catch (error) {
		return <h1>some error has occured</h1>;
	}

	return (
		<>
			{user && (
				<div className="grid grid-cols-1   min-w-60 max-w-96 justify-center items-center gap-4 p-4 mx-auto border-4 border-main rounded-md">
					<Image
						src={
							user.thumbnailImg == "noImg" ? "/avatar.png" : user.thumbnailImg
						}
						alt="user img"
						loading="lazy"
						width={200}
						height={200}
						className="aspect-square"
					/>
					<h1 className="text-xl text-main capitalize font-bold ">
						{user.name}
					</h1>
					<p className="text-lg capitalize ">{user.email}</p>
					<span className=" capitalize">honor points :{user.honorPoints}</span>
					<span className=" capitalize">
						quizzes solved :{user.solvedList?.length}
					</span>
				</div>
			)}
		</>
	);
}
