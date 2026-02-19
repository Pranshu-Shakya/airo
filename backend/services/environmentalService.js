import { getAQI } from "./aqiService.js";

import { getNearbyIncidents } from "./incidentService.js";

import { INCIDENT_TYPES } from "../configs/incidentTypes.js";

import { ZONES } from "../configs/zones.js";

import {
    getCache,
    setCache
}
from "../utils/cache.js";


/*
 Calculate incident penalty
*/

function calculateIncidentPenalty(
    lat,
    lon,
    incidents
) {

    let totalPenalty = 0;

    for(const incident of incidents) {

        const [incidentLon, incidentLat] =
        incident.location.coordinates;

        const distance =
        getDistanceMeters(
            lat,
            lon,
            incidentLat,
            incidentLon
        );

        const config =
        INCIDENT_TYPES[incident.type];

        const radius =
        config.radius;

        const basePenalty =
        config.penalty;

        const confidence =
        incident.confidence;

        const trustScore =
        incident.reportedBy?.trustScore
        || 0.5;

        if(distance > radius)
            continue;

        const distanceFactor =
        Math.exp(-distance / radius);

        const penalty =
        basePenalty *
        confidence *
        trustScore *
        distanceFactor;

        totalPenalty += penalty;
    }

    return totalPenalty;
}


/*
 Environmental Score Function
*/

export async function getEnvironmentalScore(
    lat,
    lon
) {

    const cacheKey =
    `env:${lat.toFixed(4)}:${lon.toFixed(4)}`;

    const cached =
    getCache(cacheKey);

    if(cached)
        return cached;

    try {

        const officialAQI =
        await getAQI(lat, lon);

        const incidents =
        await getNearbyIncidents(
            lat,
            lon,
            2000
        );

        const incidentPenalty =
        calculateIncidentPenalty(
            lat,
            lon,
            incidents
        );

        const zonePenalty =
        calculateZonePenalty(
            lat,
            lon
        );

        const score =
        0.4 * officialAQI +
        0.4 * incidentPenalty +
        0.2 * zonePenalty;

        // cache for 5 minutes
        setCache(
            cacheKey,
            score,
            5 * 60
        );

        return score;

    } catch {

        return 100;

    }
}

/*
 Distance function
*/

function getDistanceMeters(lat1, lon1, lat2, lon2) {
	const R = 6371000;

	const dLat = ((lat2 - lat1) * Math.PI) / 180;

	const dLon = ((lon2 - lon1) * Math.PI) / 180;

	const a =
		Math.sin(dLat / 2) ** 2 +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) ** 2;

	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function calculateZonePenalty(lat, lon) {
	let totalPenalty = 0;

	for (const zone of ZONES) {
		const distance = getDistanceMeters(lat, lon, zone.lat, zone.lon);

		if (distance > zone.radius) continue;

		const penalty = zone.penalty * Math.exp(-distance / zone.radius);

		totalPenalty += penalty;
	}

	return totalPenalty;
}
