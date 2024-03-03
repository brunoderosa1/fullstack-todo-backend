import express from "express";
import bodyParser from "body-parser";
import cors from 'cors'
import morgan from "morgan";

import errorsHandler from "./src/middleware/errorsHandler.js";
import verifyAuthToken from "./src/middleware/verifyAuthToken.js";
import {
    RouteLoadError,
} from "./src/utils/Errors.js";
import registerModulesRoutes from "./src/utils/RegisterModulesRoutes.js";


import { tryCatch } from "./src/utils/TryCatch.js";

const port = process.env.PORT || 3000;

const ROUTE_TO_MODULES = './src/modules';

const app = express();

app.use(bodyParser.json());
app.use(cors())
app.use(morgan("dev"));

try {
    registerModulesRoutes(app, ROUTE_TO_MODULES);
} catch (error) {
    throw new RouteLoadError(error.message);
}

app.get("/", await tryCatch((req, res, next) => {
    res.send("Hello World!");
}));

app.use(errorsHandler);
app.use(verifyAuthToken);

app.listen(port, () => {
    console.log(`App listening at port: ${port}`);
});
