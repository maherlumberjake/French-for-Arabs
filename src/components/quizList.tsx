import Link from "next/link";

import QuizSnippet from "@/components/quizSnippet/quizSnippet";

import { getAllQuizzes } from "@/app/lib/actions/quizzes";

export default async function QuizList(props: { page: number }) {
	const res: { total: number; data: Quiz[] } = await getAllQuizzes(props.page);
	const data = res.data;
	return (
		<>
			{data && data.length > 0 ? (
				<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
					{data.map((quiz: Quiz) => (
						<QuizSnippet
							key={quiz._id}
							quiz={JSON.parse(JSON.stringify(quiz))}
						/>
					))}
				</section>
			) : (
				<h2>no data to show</h2>
			)}
			<Link
				href="/CreateQuiz"
				className=" sticky bottom-10 right-10 w-fit hover:opacity-80 "
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="size-12 bg-main p-2 rounded-full "
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>
			</Link>
		</>
	);
}
