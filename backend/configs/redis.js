import dotenv from "dotenv";
dotenv.config();

import { createClient } from "redis";

const redisClient = createClient({
    username: "default",
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
    },
});

redisClient.on("error", (err) =>
    console.log("Redis Client Error", err)
);

export async function connectRedis() {

    // Connect to Redis

    await redisClient.connect();

    console.log("Redis connected");

}

export default redisClient;
