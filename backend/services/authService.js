import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/UserModel.js";

import {
    JWT_SECRET,
    JWT_EXPIRY
}
from "../configs/jwt.js";

/*
 Signup
*/

export async function signup({
    name,
    email,
    password
}) {

    const existing =
    await User.findOne({ email });

    if(existing)
        throw new Error(
            "Email already exists"
        );

    const hashed =
    await bcrypt.hash(
        password,
        10
    );

    const user =
    await User.create({

        name,
        email,
        password: hashed

    });

    return generateToken(user);
}

/*
 Signin
*/

export async function signin({
    email,
    password
}) {

    const user =
    await User.findOne({ email });

    if(!user)
        throw new Error(
            "Invalid credentials"
        );

    const valid =
    await bcrypt.compare(
        password,
        user.password
    );

    if(!valid)
        throw new Error(
            "Invalid credentials"
        );

    return generateToken(user);
}

/*
 Generate JWT
*/

function generateToken(user) {

    return jwt.sign({

        id: user._id,
        email: user.email

    },
    JWT_SECRET,
    {
        expiresIn:
        JWT_EXPIRY
    });

}
