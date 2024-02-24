// auth.routes.js
import { Router } from "express";
import * as authControllers from "./auth.controllers.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Hello from auth!" });
});

authRouter.post("/login", authControllers.login);

authRouter.post("/signup", authControllers.signup);

authRouter.post("/logout", authControllers.logout);

authRouter.post("/forgot-password", authControllers.forgotPassword);

export default function (app) {
    app.use('/auth', authRouter);
}
