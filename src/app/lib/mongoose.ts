import { Mongoose } from "mongoose";

const connectMongo = async (): Promise<Mongoose> => {
	try {
		const mongoose = await require("mongoose");
		const conn = await mongoose.connect(process.env.CONN_STR as string);

		console.log(`MongoDB connected: ${conn.connection.host}`);
		return mongoose;
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
		throw error;
	}
};

export default connectMongo;
