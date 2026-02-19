import express from "express";
import cors from "cors";
import { config } from "dotenv";

import routeController
from "./routes/routeController.js";

import incidentController
from "./routes/incidentController.js";

import { connectDatabase }
from "./configs/database.js";

import authController
from "./routes/authController.js";

import "./cron/incidentCron.js";

import { connectRedis }
from "./configs/redis.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/route",
routeController);

app.use("/incident",
incidentController);

app.use("/auth",
authController);

connectDatabase();
connectRedis();

app.listen(4000,
()=>console.log("Server running at http://localhost:4000"));
