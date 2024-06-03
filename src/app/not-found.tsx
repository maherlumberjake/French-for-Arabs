import notFound from "../../public/not-found.png";
import Image from "next/image";
export default function NotFound() {
	return (
		<div className="grid items-center h-full mt-20 justify-center">
			<h1 className="text-center text-2xl sm:text-4xl">
				Sorry ! the page you are looking for was not found
			</h1>
			<Image
				src={notFound}
				alt="not found "
				priority={true}
				width={400}
				className="mx-auto"
			/>
		</div>
	);
}
