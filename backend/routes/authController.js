import express from "express";

import {
    signup,
    signin
}
from "../services/authService.js";

const router =
express.Router();

/*
 Signup
*/

router.post("/signup",
async (req, res) => {

    try {

        const token =
        await signup(
            req.body
        );

        res.json({
            token
        });

    } catch(error) {

        res.status(400)
        .json({
            error:
            error.message
        });

    }

});

/*
 Signin
*/

router.post("/signin",
async (req, res) => {

    try {

        const token =
        await signin(
            req.body
        );

        res.json({
            token
        });

    } catch(error) {

        res.status(400)
        .json({
            error:
            error.message
        });

    }

});

export default router;
