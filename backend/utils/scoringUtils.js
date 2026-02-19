import { getEnvironmentalScore }
from "../services/environmentalService.js";

import { TRAFFIC_WEIGHTS }
from "../configs/trafficWeights.js";

/*
 Traffic penalty calculation
*/

function calculateTrafficPenalty(route) {

    let penalty = 0;

    for(const leg of route.legs) {

        for(const step of leg.steps || []) {

            const roadType =
            step.mode || "residential";

            const weight =
            TRAFFIC_WEIGHTS[roadType]
            || 40;

            penalty += weight;

        }

    }

    return penalty / 50;
}

/*
 Health score calculation
*/

export async function calculateHealthScore(route) {

    const coordinates =
    route.geometry.coordinates;

    let totalScore = 0;
    let count = 0;

    for(let i=0; i<coordinates.length; i+=100) {

        const [lon, lat] =
        coordinates[i];

        const score =
        await getEnvironmentalScore(
            lat,
            lon
        );

        totalScore += score;
        count++;

    }

    const environmentalScore =
    totalScore / count;

    const trafficPenalty =
    calculateTrafficPenalty(route);

    // combine scores
    const finalScore =
    environmentalScore +
    trafficPenalty;

    return finalScore;
}
