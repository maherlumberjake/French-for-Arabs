import { getAllQuizzes, getQuiz } from "@/app/lib/actions/quizzes";
import Lvl from "@/components/lvl";
import Options from "@/components/options";
import { Suspense } from "react";

export async function generateStaticParams() {
	const Quizzess = (await getAllQuizzes()) as Quiz[];
	return Quizzess.map((quiz) => ({ id: quiz._id.toString() }));
}
export async function generateMetadata({ params }: { params: { id: string } }) {
	const quiz = await getQuiz(params.id);
	return {
		title: quiz?.title,
		description: quiz?.question,
	};
}

export default async function QuizDetails({
	params,
}: {
	params: { id: string };
}) {
	const quiz: Quiz | null | undefined = await getQuiz(params.id);

	return (
		<>
			<Suspense fallback={<h2>loading</h2>}>
				{quiz ? (
					<div className="mt-10 grid gap-8">
						<div className="flex justify-between items-center">
							{" "}
							<h1 className="text-main text-4xl capitalize font-bold">
								{quiz.title}
							</h1>
							<Lvl lvl={quiz.difficulty} />
						</div>

						<span>{quiz.kind}</span>

						<p>
							{" "}
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6 inline mr-2 text-main"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
								/>
							</svg>
							{quiz.question}
						</p>
						<Options
							opts={quiz.options}
							correct={quiz.correct}
							id={quiz._id.toString()}
						/>
						<span>
							{" "}
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
							solved by{" "}
							{quiz.solvedBy.length > 1
								? `${quiz.solvedBy.length} people`
								: `${quiz.solvedBy.length} person`}
						</span>
					</div>
				) : (
					<h2>some error has occured</h2>
				)}
			</Suspense>
		</>
	);
}
