import express from "express";
import bodyParser from "body-parser";

import errorsHandler from "./src/middleware/errorsHandler.js";
import {
    DbError,
    RouteLoadError,
    UnauthorizedError,
} from "./src/utils/errors.js";
import registerModulesRoutes from "./src/utils/RegisterModulesRoutes.js";


import { initializeApp, cert } from "firebase-admin/app";
import { tryCatch } from "./src/utils/TryCatch.js";

initializeApp({
    credential: cert("./credentials.json"),
});

const port = process.env.PORT || 3000;

const ROUTE_TO_MODULES = './src/modules';

const app = express();

app.use(bodyParser.json());

try {
    await registerModulesRoutes(app, ROUTE_TO_MODULES);
} catch (error) {
    throw new RouteLoadError(error.message);
}

app.get("/", await tryCatch((req, res, next) => {
    res.send("Hello World!");
}));

app.use(errorsHandler);

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});
