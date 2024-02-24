// auth.routes.js
import { Router } from "express";
import * as todosControllers from "./todos.controllers.js";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

// todosRouter.get("/:id", (req, res) => {
//     res.json({ message: "Hello from todos!" });
// });

// todosRouter.post("/create", (req, res) => {
//     res.json({ message: "Hello from todos!" });
// });

// todosRouter.put("/:id", (req, res) => {

// })

export default function (app) {
    app.use('/todos', todosRouter);
}