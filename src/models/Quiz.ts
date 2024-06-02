import mongoose, { models } from "mongoose";
export const QuizSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "title cannot be empty"],
		minLength: [3, "title at least should have 3 ch"],
	},
	question: {
		type: String,
		required: [true, "question cannot be empty"],
		minLength: [5, "question cannot be less than 5ch"],
	},
	difficulty: {
		type: String,
		default: "newbie",
	},
	kind: {
		type: String,
	},
	options: {
		type: [String],
		length: [4, "you should provide 4 options"],
	},
	correct: {
		type: String,
		required: [true, "provide the answer correct"],
	},
	solvedBy: {
		type: [mongoose.Types.ObjectId],
		ref: "User",
		default: [],
	},
	owner: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
});

export const QuizModel = models.Quiz || mongoose.model("Quiz", QuizSchema);
