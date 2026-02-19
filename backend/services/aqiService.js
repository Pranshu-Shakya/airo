import axios from "axios";

import {
    getCache,
    setCache
}
from "../utils/cache.js";

export async function getAQI(lat, lon) {

    const cacheKey =
    `aqi:${lat.toFixed(4)}:${lon.toFixed(4)}`;

    const cached =
    getCache(cacheKey);

    if(cached)
        return cached;

    try {

        const url =
        `https://api.openaq.org/v2/latest?coordinates=${lat},${lon}`;

        const response =
        await axios.get(url);

        let aqi = 100;

        if(response.data.results.length > 0) {

            const measurements =
            response.data.results[0].measurements;

            const pm25 =
            measurements.find(
                m=>m.parameter==="pm25"
            );

            if(pm25)
                aqi = pm25.value;
        }

        // cache for 10 minutes
        setCache(
            cacheKey,
            aqi,
            10 * 60
        );

        return aqi;

    } catch {

        return 100;

    }
}
