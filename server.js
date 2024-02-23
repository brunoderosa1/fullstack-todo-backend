import express from "express";
import errorsHandler from "./src/middleware/errorsHandler.js";
import { RouteLoadError } from "./src/utils/errors.js";
import registerModulesRoutes from "./src/utils/RegisterModulesRoutes.js";

const port = process.env.PORT || 3000;

const app = express();

try {
  await registerModulesRoutes(app, "./src/modules");
} catch (error) {
  throw new RouteLoadError(error.message);
}


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});
