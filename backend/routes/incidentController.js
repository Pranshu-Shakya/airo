import express from "express";

import {
	reportIncident,
	confirmIncident,
	getActiveIncidents,
} from "../services/incidentService.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

/*
 Report Incident
*/

router.post("/report", authenticate, async (req, res) => {
	try {
		const { type, lat, lon, severity } = req.body;

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

export default router;
