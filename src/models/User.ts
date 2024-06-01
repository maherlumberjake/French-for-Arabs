import mongoose, { models } from "mongoose";
import bcrypt from "bcryptjs";

export const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "name cannot be empty"],
		minLength: [3, "name at least should have 3 ch"],
	},
	email: {
		type: String,
		required: [true, "email cannot be empty"],
		unique: [true, "this email already been taken"],
	},
	password: {
		type: String,
		required: [true, "password cannot be empty"],
		minLength: [5, "password should be at least 5ch"],
		select: false,
	},
	confirmPassword: {
		type: String,
		required: [true, "please confirm password "],
		select: false,
	},
	honorPoints: {
		type: Number,
		default: 0,
	},
	thumbnailImg: {
		type: String,
		default: "noImg",
	},
	role: {
		type: Boolean,
		default: false,
	},
	solvedList: {
		type: [mongoose.Types.ObjectId],
		ref: "Quiz",
		default: [],
	},
});
UserSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 10);
	this.confirmPassword = undefined!;
	next();
});
export const UserModel = models.User || mongoose.model("User", UserSchema);
