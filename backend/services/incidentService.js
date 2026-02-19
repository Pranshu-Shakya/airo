import Incident from "../models/IncidentModel.js";
import User from "../models/UserModel.js";
import { INCIDENT_TYPES } from "../configs/incidentTypes.js";


/*
 Report Incident
*/

export async function reportIncident({ type, lat, lon, severity, userId }) {
	if (!INCIDENT_TYPES[type]) throw new Error("Invalid type");

	const expiryTime = INCIDENT_TYPES[type].expiry;

	const incident = await Incident.create({
		type,

		location: {
			type: "Point",
			coordinates: [lon, lat],
		},

		severity,

		reports: 1,

		confidence: 0.3,
		reportedBy: userId,
		expiresAt: new Date(Date.now() + expiryTime),
	});

	return incident;
}

/*
 Confirm Incident
*/

export async function confirmIncident(
    incidentId,
    userId
){

    const incident =
    await Incident.findById(incidentId)
    .populate("confirmedBy")
    .populate("reportedBy");

    if(!incident)
        throw new Error("Incident not found");

    /*
     Prevent duplicate confirmation
    */

    const alreadyConfirmed =
    incident.confirmedBy.some(
        user =>
        user._id.toString() === userId
    );

    if(alreadyConfirmed)
        throw new Error(
            "Already confirmed"
        );

    /*
     Add user confirmation
    */

    incident.confirmedBy.push(userId);

    incident.reports++;

    /*
     Recalculate confidence
    */

    let trustSum = 0;

    const confirmingUsers =
    await User.find({
        _id:
        { $in: incident.confirmedBy }
    });

    confirmingUsers.forEach(user=>{
        trustSum += user.trustScore;
    });

    const avgTrust =
    trustSum / confirmingUsers.length;

    incident.confidence =
    Math.min(
        1,
        confirmingUsers.length * 0.25 *
        avgTrust
    );

    await incident.save();

    /*
     Reward confirming user
    */

    const user =
    await User.findById(userId);

    user.trustScore =
    Math.min(
        1,
        user.trustScore + 0.02
    );

    await user.save();

    return incident;
}


/*
 Get nearby incidents
*/

export async function getNearbyIncidents(lat, lon, radiusMeters = 1000) {
	return await Incident.find({
		location: {
			$near: {
				$geometry: {
					type: "Point",
					coordinates: [lon, lat],
				},

				$maxDistance: radiusMeters,
			},
		},

		expiresAt: {
			$gt: new Date(),
		},
	}).populate("reportedBy");
}

/*
 Get all active incidents
*/

export async function getActiveIncidents() {
	return await Incident.find({
		expiresAt: {
			$gt: new Date(),
		},
	}).populate("reportedBy");
}
