"use client";

import { axiosLocal } from "@/app/lib/axiosConfig";
import { FormEvent, useState } from "react";

export default function CreateQuiz() {
	const [sending, setSending] = useState<boolean>(false);
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		setSending(true);
		e.preventDefault();
		const data = new FormData(e.target as HTMLFormElement);
		const formDataObject = Object.fromEntries(data.entries());
		const correct = data.get(data.get("correct") as string);
		const quiz = {
			...formDataObject,
			options: [
				data.get("option1"),
				data.get("option2"),
				data.get("option3"),
				data.get("option4"),
			],
			correct,
		};
		try {
			const res = await axiosLocal.post("/quizzes", quiz);
			console.log(res);
		} catch (error) {
			console.log(error);
		} finally {
			setSending(false);
		}
	}
	return (
		<>
			<form
				className="grid grid-cols-1 mx-auto  justify-center items-center gap-4 p-4 *:grid
             *:grid-cols-2  max-w-2xl"
				onSubmit={(e) => handleSubmit(e)}
				method="post"
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
					<h2 className=" col-span-2 text-main font-bold text-xl">Options</h2>
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
						/>
					</label>
				</div>
				<input
					type="submit"
					disabled={sending}
					value={sending ? "sending" : "send"}
					className=" bg-main text-light text-xl font-bold capitalize p-2 rounded-md hover:opacity-80 transition-colors my-8"
				/>
			</form>
		</>
	);
}
