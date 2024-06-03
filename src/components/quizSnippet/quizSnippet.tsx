import Link from "next/link";
import Lvl from "../lvl";

export default function QuizSnippet({ quiz }: { quiz: Quiz }) {
	return (
		<Link href={`/quizzess/${quiz._id}`}>
			<div className="flex flex-col gap-2 sm:gap-4 shadow-sm  shadow-slate-500 p-2 hover:scale-105 transition-transform">
				<h2 className="text-main text-lg sm:text-xl">{quiz.title}</h2>
				<p>{quiz.question}</p>
				<div className="flex justify-between gap-4 w-full items-center">
					<Lvl lvl={quiz.difficulty} />
					<span>{quiz.kind}</span>
					<span>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="size-6 inline mr-2 text-green-500"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
							/>
						</svg>

						{quiz.solvedBy.length}
					</span>
				</div>
			</div>
		</Link>
	);
}
