import mongoose from "mongoose";

export async function connectDatabase() {

    try {

        await mongoose.connect(
            "mongodb+srv://pranshushakya12b20_db_user:BI1JrVSrd2cP0UR4@cluster0.iqiu4j7.mongodb.net/cleanroute"
        );

        console.log("MongoDB connected");

    } catch (error) {

        console.error("MongoDB connection failed", error);

        process.exit(1);

    }

}
