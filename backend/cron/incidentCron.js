import cron from "node-cron";

import Incident from "../models/IncidentModel.js";
import User from "../models/UserModel.js";

/*
 Cron Job 1:
 Remove expired incidents
 Runs every 10 minutes
*/

cron.schedule("*/10 * * * *", async () => {

    console.log("Running expired incident cleanup...");

    const expiredIncidents =
    await Incident.find({
        expiresAt: { $lt: new Date() }
    });

    for(const incident of expiredIncidents){

        const user =
        await User.findById(
            incident.reportedBy
        );

        if(user){

            /*
             If incident had low confirmations,
             decrease trustScore
            */

            if(incident.reports <= 1){

                user.trustScore =
                Math.max(
                    0,
                    user.trustScore - 0.05
                );

            }

            /*
             If incident had many confirmations,
             increase trustScore
            */

            if(incident.reports >= 3){

                user.trustScore =
                Math.min(
                    1,
                    user.trustScore + 0.05
                );

            }

            await user.save();
        }
    }

    /*
     Delete expired incidents
    */

    await Incident.deleteMany({
        expiresAt: { $lt: new Date() }
    });

    console.log(
        "Expired incidents cleaned"
    );

});


/*
 Cron Job 2:
 Reduce trustScore for spam users
 Runs every day at midnight
*/

cron.schedule("0 0 * * *", async () => {

    console.log("Running trustScore decay...");

    const users =
    await User.find();

    for(const user of users){

        /*
         Slight natural decay
         prevents permanent max trust
        */

        user.trustScore =
        Math.max(
            0.1,
            user.trustScore - 0.01
        );

        await user.save();
    }

});


/*
 Cron Job 3:
 Clean stale incidents cache
 (Optional improvement)
*/

cron.schedule("*/30 * * * *", async () => {

    console.log("Cron health check OK");

});
