import express from "express";
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

const app = express();

try {
    await registerModulesRoutes(app, "./src/modules");
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
