// auth.routes.js
import { Router } from "express";

const todosRouter = Router();

todosRouter.get("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

todosRouter.get("/:id", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

// i need routes to crud todos


todosRouter.post("/", (req, res) => {
    res.json({ message: "Hello from todos!" });
});

todosRouter.put("/:id", (req, res) => {
    
})

export default function (app) {
    app.use('/todos', todosRouter);
}