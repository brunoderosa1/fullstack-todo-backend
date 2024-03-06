// auth.routes.js
import { Router } from "express";
import * as todosControllers from "./todos.controllers.js";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

todosRouter.get("/all", todosControllers.getTodos);

todosRouter.get("/:id", todosControllers.getTodo);

todosRouter.post("/create", todosControllers.createTodo);

todosRouter.put("/:id", todosControllers.updateTodo);

todosRouter.delete("/:id", todosControllers.deleteTodo);


export default function (app) {
    app.use('/todos', todosRouter);
}