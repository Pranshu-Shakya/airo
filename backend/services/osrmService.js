import axios from "axios";

export async function generateRoutes(start, end) {

    const routes = [];

    const [startLon, startLat] = start.split(",").map(Number);
    const [endLon, endLat] = end.split(",").map(Number);

    const midLon = (startLon + endLon) / 2;
    const midLat = (startLat + endLat) / 2;

    const radius = 0.004;

    const waypointOffsets = [
        [0, 0],
        [radius, 0],
        [-radius, 0],
        [0, radius],
        [0, -radius],
        [radius, radius],
        [-radius, -radius]
    ];

    for (const [dx, dy] of waypointOffsets) {

        try {

            let url;

            if(dx === 0 && dy === 0) {

                url =
                `https://router.project-osrm.org/route/v1/foot/${start};${end}?overview=full&geometries=geojson`;

            } else {

                const wpLon = midLon + dx;
                const wpLat = midLat + dy;

                url =
                `https://router.project-osrm.org/route/v1/foot/${start};${wpLon},${wpLat};${end}?overview=full&geometries=geojson&steps=true`;
            }

            const response = await axios.get(url);

            if(response.data.routes.length > 0) {

                const route = response.data.routes[0];

                const isDuplicate = routes.some(r =>
                    Math.abs(r.distance - route.distance) < 50
                );

                if(!isDuplicate)
                    routes.push(route);
            }

            if(routes.length === 3)
                break;

        } catch(e) {}
    }

    return routes;
}
