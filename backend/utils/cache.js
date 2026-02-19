import redisClient
from "../configs/redis.js";

/*
 Set cache
*/

export async function setCache(
    key,
    value,
    ttlSeconds
){

    await redisClient.set(
        key,
        JSON.stringify(value),
        {
            EX: ttlSeconds
        }
    );

}

/*
 Get cache
*/

export async function getCache(key){

    const value =
    await redisClient.get(key);

    if(!value)
        return null;

    return JSON.parse(value);
}
