// auth.routes.js
import { Router } from "express";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

export default function (app) {
    app.use('/todos', todosRouter);
}