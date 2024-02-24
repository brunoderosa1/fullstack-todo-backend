// auth.routes.js
import { Router } from "express";
import { tryCatch } from "../../utils/TryCatch.js";
import * as todosControllers from "./todos.controllers.js";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

todosRouter.get("/:id", tryCatch(todosControllers.getTodo));;

todosRouter.post("/create", tryCatch(todosControllers.createTodo));

todosRouter.put("/:id", tryCatch(todosControllers.updateTodo));

todosRouter.delete("/:id", tryCatch(todosControllers.deleteTodo));

export default function (app) {
    app.use('/todos', todosRouter);
}