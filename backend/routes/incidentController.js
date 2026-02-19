import express from "express";

import {
	reportIncident,
	confirmIncident,
	getActiveIncidents,
} from "../services/incidentService.js";
import { authenticate } from "../middleware/authMiddleware.js";
import Incident
from "../models/IncidentModel.js";

const router = express.Router();

/*
 Report Incident
*/

router.post("/report", authenticate, async (req, res) => {
	try {
		const { type, lat, lon, severity } = req.body;
        console.log("Received report request:", { type, lat, lon, severity, userId: req.user.id });

		const incident = await reportIncident({
			type,
			lat,
			lon,
			severity,
			userId: req.user.id,
		});

		res.json(incident);
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
});

/*
 Confirm Incident
*/

router.post("/confirm", authenticate, async (req, res) => {
	try {
		const incident = await confirmIncident(req.body.id, req.user.id);

		res.json(incident);
	} catch (error) {
		res.status(400).json({
			error: error.message,
		});
	}
});

/*
 Get Active Incidents
*/

router.get("/", authenticate, async (req, res) => {
	const incidents = await getActiveIncidents();
	router.post("/confirm", authenticate, async (req, res) => {
		try {
			const incident = await confirmIncident(req.body.id, req.user.id);

			res.json(incident);
		} catch (error) {
			res.status(400).json({
				error: error.message,
			});
		}
	});

	res.json(incidents);
});

/*
 GET incidents formatted for map display
*/

router.get(
"/map",
async (req, res) => {

    try {

        const incidents =
        await Incident.find({

            expiresAt:
            { $gt: new Date() }

        })
        .populate(
            "reportedBy",
            "name trustScore"
        );

        const formatted =
        incidents.map(
        incident => {

            const [
                lon,
                lat
            ] =
            incident.location.coordinates;

            return {

                id:
                incident._id,

                type:
                incident.type,

                lat,
                lon,

                severity:
                incident.severity,

                confidence:
                incident.confidence,

                reports:
                incident.reports,

                reportedBy:
                incident.reportedBy?.name,

                trustScore:
                incident.reportedBy?.trustScore,

                createdAt:
                incident.createdAt,

                expiresAt:
                incident.expiresAt,

                /*
                 frontend styling helpers
                */

                color:
                getIncidentColor(
                    incident.type
                ),

                radius:
                getIncidentRadius(
                    incident.type
                )

            };

        });

        res.json({

            success: true,

            count:
            formatted.length,

            incidents:
            formatted

        });

    }
    catch(error){

        res.status(500)
        .json({
            error:
            error.message
        });

    }

});


export default router;


function getIncidentColor(type){

    switch(type){

        case "FIRE":
            return "#ff0000";

        case "INDUSTRIAL":
            return "#cc0000";

        case "CONSTRUCTION":
            return "#ff9900";

        case "TRAFFIC":
            return "#0066ff";

        case "GARBAGE_BURNING":
            return "#ff3300";

        case "ROAD_DUST":
            return "#cc6600";

        default:
            return "#666666";

    }

}

function getIncidentRadius(type){

    switch(type){

        case "FIRE":
            return 800;

        case "INDUSTRIAL":
            return 1200;

        case "CONSTRUCTION":
            return 600;

        case "TRAFFIC":
            return 400;

        case "GARBAGE_BURNING":
            return 700;

        case "ROAD_DUST":
            return 500;

        default:
            return 500;

    }

}
