import { getLikeList } from "@/app/lib/actions/quizzes";
import QuizSnippet from "../quizSnippet/quizSnippet";

export default async function SolvedList({ id }: { id: string }) {
	const solvedListArray: Quiz[] = await getLikeList(id);
	return (
		<>
			{solvedListArray &&
				solvedListArray.map((quiz) => (
					<QuizSnippet
						key={quiz._id}
						quiz={quiz}
					/>
				))}
		</>
	);
}
