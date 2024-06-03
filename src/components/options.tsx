"use client";

import { useState } from "react";
import ToolTip from "./toolTip/toolTIp";
import { Solve } from "@/app/lib/actions/quizzes";

export default function Options({
	opts,
	correct,
	id,
}: {
	opts: string[];
	correct: string;
	id: string;
}) {
	const [selected, setSelected] = useState<string>();
	const [message, setMessage] = useState<string | null>(null);

	async function checkResult() {
		const data = await Solve(id, correct === selected);
		console.log(data);
		if (selected === correct) {
			setMessage("Correct! well done");
			setTimeout(() => {
				setMessage(null);
			}, 3000);
		} else {
			setMessage("Incorrect! The correct answer is " + correct);
			setTimeout(() => {
				setMessage(null);
			}, 3000);
		}
	}
	console.log(selected, correct);
	return (
		<div className="flex justify-evenly gap-2">
			<div className=" flex justify-evenly gap-2 w-1/4">
				{opts.map((opt, index) => (
					<button
						key={index}
						onClick={() => setSelected(opts[index])}
						className={`border-2 border-alt p-1 rounded-md 
									cursor-pointer  hover:scale-105 transition-transform ${
										opt === selected ? "border-green-500" : "border-alt"
									}`}
					>
						{opt}
					</button>
				))}
			</div>
			<button
				onClick={checkResult}
				className=" w-fit ml-auto bg-main text-white p-2 rounded-md hover:opacity-85 capitalize"
			>
				check
			</button>
			{message && <ToolTip msg={message} />}
		</div>
	);
}
