"use server";
import connectMongo from "@/app/lib/mongoose";
import { QuizModel } from "@/models/Quiz";

export async function createNew(form: FormData) {
	await connectMongo();
	const data = form;
	const formDataObject = Object.fromEntries(data.entries());
	const correct = data.get(data.get("correct") as string);
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
