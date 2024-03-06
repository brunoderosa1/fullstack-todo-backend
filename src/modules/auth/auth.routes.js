// auth.routes.js
import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Hello from auth!" });
});

export default function (app) {
    app.use("/auth", authRouter);
}
