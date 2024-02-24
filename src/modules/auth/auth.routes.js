// auth.routes.js
import { Router } from "express";
import {login, signup, logout, forgotPassword } from "./auth.controllers.js";
import { tryCatch } from "../../utils/TryCatch.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Hello from auth!" });
});

authRouter.post("/login", await tryCatch(login) );

authRouter.post("/signup", await tryCatch(signup));

authRouter.post("/logout", await tryCatch(logout));

authRouter.post("/forgot-password", await tryCatch(forgotPassword));

export default function (app) {
    app.use('/auth', authRouter);
}
