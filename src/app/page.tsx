import heroImg from "../../public/heroImg.png";
import Image from "next/image";
export default function Home() {
	return (
		<main className=" mt-60 sm:mt-20 md:mt-10 h-max flex flex-col gap-8 border-b-4 border-main relative  items-center justify-evenly">
			<div className="flex flex-col gap-8 ">
				<h1 className="text-main text-2xl font-bold text-center sm:text-3xl md:text-4xl">
					French 4 Arabs
				</h1>
				<h2 className="text-2xl text-center sm:text-3xl md:text-4xl">
					Better <span className="text-main font-bold">learning</span> process
				</h2>
			</div>
			<Image
				src={heroImg}
				alt="hero Image"
			/>
		</main>
	);
}
