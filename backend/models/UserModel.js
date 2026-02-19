import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},

	email: {
		type: String,
		required: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
	},

	trustScore: {
		type: Number,
		default: 0.5,
		min: 0,
		max: 1,
	},

	reportsCount: {
		type: Number,
		default: 0,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export default mongoose.model("User", UserSchema);
