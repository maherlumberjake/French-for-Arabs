"use server";
import connectMongo from "@/app/lib/mongoose";
import { QuizModel } from "@/models/Quiz";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserModel } from "@/models/User";
import { Types } from "mongoose";
const SECRET = process.env.SECRET_STR as string;
export async function createNew(form: FormData) {
	await connectMongo();
	const data = form;
	const formDataObject = Object.fromEntries(data.entries());
	const correct = data.get(data.get("correct") as string) as string;
	const rawquiz = {
		...formDataObject,
		options: [
			data.get("option1"),
			data.get("option2"),
			data.get("option3"),
			data.get("option4"),
		],
		correct,
	};

	const compareSet = new Set(rawquiz.options);
	if (rawquiz.options.length != compareSet.size) {
		return { error: "Options must be unique." };
	}
	try {
		const quiz = await QuizModel.create(rawquiz);
		return { quiz, message: "created successfully" };
	} catch (error) {
		return { error, message: "failed" };
	}
}
export async function getAllQuizzes() {
	try {
		await connectMongo();
		const quizzes: Quiz[] = await QuizModel.find();
		return quizzes;
	} catch (error) {
		console.log(error);
	}
}
export async function getQuiz(id: string) {
	try {
		await connectMongo();
		const quiz: Quiz | null = await QuizModel.findById(id);
		if (quiz) return quiz;
		return null;
	} catch (error) {
		console.log(error);
	}
}
export async function Solve(quizID: string, result: boolean) {
	try {
		await connectMongo();
		const token = cookies().get("token")?.value as string;
		const decoded = jwt.verify(token, SECRET) as JwtPayload;

		if (decoded) {
			const userId = decoded.id;
			const quiz = (await QuizModel.findById(quizID)) as Quiz;
			let user = (await UserModel.findById(userId)) as User;
			const alreadyExsist = user.solvedList.filter((e) => e == quizID);
			console.log(alreadyExsist);
			let quizresult = 0;
			if (result && alreadyExsist.length == 0) {
				switch (quiz.difficulty) {
					case "newbie":
						quizresult = 1;
						break;

					case "intermediate":
						quizresult = 2;
						break;
					case "advanced":
						quizresult = 3;
						break;
					case "expert":
						quizresult = 4;
						break;
					case "native":
						quizresult = 5;
						break;
					default:
						quizresult;
				}
			}

			await UserModel.findByIdAndUpdate(user._id, {
				$addToSet: {
					solvedList:
						user.solvedList.length > 0
							? [...user.solvedList, quiz._id]
							: [quiz._id],
				},
				honorPoints: user.honorPoints + quizresult,
			});
			await QuizModel.findByIdAndUpdate(quiz._id, {
				$addToSet: {
					solvedBy:
						quiz.solvedBy.length > 0
							? [...quiz.solvedBy, user._id]
							: [user._id],
				},
			});
		}
	} catch (error) {
		console.log(error);
	}
}
