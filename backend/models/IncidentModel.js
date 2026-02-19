import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
	type: {
		type: String,
		enum: ["FIRE", "CONSTRUCTION", "TRAFFIC", "INDUSTRIAL", "GARBAGE_BURNING", "ROAD_DUST"],
		required: true,
	},
	location: {
		type: {
			type: String,
			enum: ["Point"],
			default: "Point",
		},

		coordinates: {
			type: [Number],
			required: true,
		},
	},

	severity: {
		type: Number,
		default: 1,
	},

	reports: {
		type: Number,
		default: 1,
	},

	confidence: {
		type: Number,
		default: 0.3,
	},
	reportedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	confirmedBy: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],

	createdAt: {
		type: Date,
		default: Date.now,
	},

	expiresAt: {
		type: Date,
		required: true,
	},
});

IncidentSchema.index({
	location: "2dsphere",
});

export default mongoose.model("Incident", IncidentSchema);
