// auth.routes.js
import { Router } from "express";
import { tryCatch } from "../../utils/TryCatch.js";
import * as todosControllers from "./todos.controllers.js";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

todosRouter.get("/:id", await tryCatch(todosControllers.getTodo));

todosRouter.post("/create", await tryCatch(todosControllers.createTodo));

todosRouter.put("/:id", await tryCatch(todosControllers.updateTodo));

todosRouter.delete("/:id", await tryCatch(todosControllers.deleteTodo));

todosRouter.get("/all", await tryCatch(todosControllers.getTodos));

export default function (app) {
    app.use('/todos', todosRouter);
}