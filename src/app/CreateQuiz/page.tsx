import SubmitButton from "@/components/submitButton/submitButton";
import { createNew } from "../lib/actions/quizzes";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function CreateQuiz() {
	const create = async (e: FormData) => {
		"use server";
		try {
			await createNew(e);
		} catch (error) {
			console.log(error);
		}
		revalidatePath("/quizzess");
		return redirect("/quizzess");
	};
	return (
		<>
			<form
				className="grid grid-cols-1 mx-auto  justify-center items-center gap-4 p-4 *:grid
             *:grid-cols-2  max-w-2xl"
				method="post"
				action={create}
			>
				<h1 className="text-xl sm:text-2xl text-main font-bold text-center sm:text-left">
					Create new Quiz
				</h1>
				<div
					className="dark:bg-light dark:text-dark bg-dark text-light p-2  rounded-md
                *:outline-none  *:border-none *:placeholder:text-slate-500"
				>
					<label
						htmlFor="title"
						className="text-main "
					>
						Title
					</label>
					<input
						type="text"
						id="title"
						placeholder="title"
						minLength={3}
						required
						name="title"
					/>
				</div>
				<div
					className="dark:bg-light dark:text-dark bg-dark text-light p-2  rounded-md
                *:outline-none  *:border-none *:placeholder:text-slate-500"
				>
					<label
						htmlFor="question"
						className="text-main "
					>
						question
					</label>
					<input
						type="text"
						id="question"
						placeholder="question"
						minLength={5}
						required
						name="question"
					/>
				</div>
				<div
					className="dark:bg-light dark:text-dark bg-dark text-light p-2  rounded-md
                *:outline-none  *:border-none *:placeholder:text-slate-500"
				>
					<label
						htmlFor="difficulty"
						className="text-main "
					>
						Difficulty
					</label>
					<select
						name="difficulty"
						id="difficulty"
						className=" capitalize *:hover:bg-light outline-none border-none"
					>
						<option
							value="newbie"
							selected
						>
							newbie
						</option>
						<option value="intermediate">intermediate</option>
						<option value="advanced">advanced</option>
						<option value="expert">expert</option>
						<option value="native">native</option>
					</select>
				</div>
				<div
					className="dark:bg-light dark:text-dark bg-dark text-light p-2  rounded-md
                *:outline-none  *:border-none *:placeholder:text-slate-500"
				>
					<label
						htmlFor="kind"
						className="text-main "
					>
						kind
					</label>
					<select
						name="kind"
						id="kind"
						className=" capitalize *:hover:bg-light outline-none border-none"
					>
						<option
							value="vocablary"
							selected
						>
							vocablary
						</option>
						<option value="grammer">grammer</option>
					</select>
				</div>

				<div
					className="dark:bg-light dark:text-dark bg-dark text-light p-2   rounded-md 
                *:outline-none  *:border-none *:placeholder:text-slate-500"
				>
					<label
						htmlFor="correct"
						className="text-main "
					>
						Correct answer
					</label>
					<select
						name="correct"
						id="correct"
						className=" capitalize *:hover:bg-light outline-none border-none"
					>
						<option
							value="option1"
							selected
						>
							option1
						</option>
						<option value="option2">option2</option>
						<option value="option3">option3</option>
						<option value="option4">option4</option>
					</select>
				</div>
				<div
					className="dark:bg-light dark:text-dark bg-dark text-light p-2  rounded-md
                *:outline-none  *:border-none *:placeholder:text-slate-500 grid-cols-subgrid *:mb-2 gap-4"
				>
					<h2 className=" col-span-2 text-main font-bold text-xl ">
						Options
						<span className="text-sm ml-4 dark:text-dark text-light font-normal">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="size-6 inline text-main"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
								/>
							</svg>
							note : if each item is not unique this quiz will not be added
						</span>
					</h2>
					<label
						htmlFor="option1"
						className="text-main"
					>
						option 1
						<input
							type="text"
							id="option1"
							required
							name="option1"
							placeholder="option 1"
							className="text-light dark:text-dark w-full"
						/>
					</label>
					<label
						htmlFor="option2"
						className="text-main"
					>
						option 2
						<input
							type="text"
							id="option2"
							required
							name="option2"
							placeholder="option 2"
							className="text-light dark:text-dark w-full"
						/>
					</label>
					<label
						htmlFor="option3"
						className="text-main"
					>
						option 3
						<input
							type="text"
							id="option3"
							required
							name="option3"
							placeholder="option 3"
							className="text-light dark:text-dark w-full"
						/>
					</label>
					<label
						htmlFor="option4"
						className="text-main"
					>
						option 4
						<input
							type="text"
							id="option4"
							required
							name="option4"
							placeholder="option 4"
							className="text-light dark:text-dark w-full"
						/>
					</label>
				</div>
				<SubmitButton />
			</form>
		</>
	);
}
