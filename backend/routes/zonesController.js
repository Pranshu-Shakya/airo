import express from "express";
import { ZONES }
from "../configs/zones.js";

const router =
express.Router();

/*
 GET all zones
*/

router.get("/",
(req, res) => {

    res.json({

        success: true,

        count:
        ZONES.length,

        zones: ZONES

    });

});

export default router;
