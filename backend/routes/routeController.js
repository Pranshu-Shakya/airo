import express from "express";

import { generateRoutes } from "../services/osrmService.js";
import { calculateHealthScore } from "../utils/scoringUtils.js";

const router = express.Router();

router.get("/", async (req, res) => {

    try {

        const { start, end } = req.query;

        if(!start || !end)
            return res.status(400).json({
                error: "start and end required"
            });

        const candidateRoutes =
        await generateRoutes(start, end);

        const scoredRoutes = [];

        for(const route of candidateRoutes) {

            const healthScore =
            await calculateHealthScore(route);

            scoredRoutes.push({

                distance: route.distance,
                duration: route.duration,
                geometry: route.geometry,
                healthScore

            });
        }

        scoredRoutes.sort(
            (a,b)=>a.healthScore-b.healthScore
        );

        res.json(scoredRoutes);

    } catch(error) {

        console.error(error);

        res.status(500).json({
            error: "Route generation failed"
        });

    }

});

export default router;
