import jwt from "jsonwebtoken";

import {
    JWT_SECRET
}
from "../configs/jwt.js";

export function authenticate(
    req,
    res,
    next
) {

    const header =
    req.headers.authorization;

    if(!header)
        return res.status(401)
        .json({
            error: "Unauthorized"
        });

    const token =
    header.split(" ")[1];

    try {

        const decoded =
        jwt.verify(
            token,
            JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch {

        res.status(401)
        .json({
            error: "Invalid token"
        });

    }

}
