export const INCIDENT_TYPES = {

    FIRE: {
        penalty: 150,
        radius: 1000,
        expiry: 6 * 60 * 60 * 1000
    },

    CONSTRUCTION: {
        penalty: 80,
        radius: 700,
        expiry: 30 * 24 * 60 * 60 * 1000
    },

    TRAFFIC: {
        penalty: 50,
        radius: 400,
        expiry: 60 * 60 * 1000
    },

    INDUSTRIAL: {
        penalty: 120,
        radius: 1500,
        expiry: 12 * 60 * 60 * 1000
    },

    GARBAGE_BURNING: {
        penalty: 100,
        radius: 800,
        expiry: 6 * 60 * 60 * 1000
    },

    ROAD_DUST: {
        penalty: 60,
        radius: 500,
        expiry: 12 * 60 * 60 * 1000
    }

};
