// auth.routes.js
import { Router } from "express";
import * as authControllers from "./auth.controllers.js";
import { tryCatch } from "../../utils/TryCatch.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Hello from auth!" });
});

authRouter.post("/login", await tryCatch(authControllers.login) );

authRouter.post("/signup", await tryCatch(authControllers.signup));

authRouter.post("/logout", await tryCatch(authControllers.logout));

authRouter.post("/forgot-password", await tryCatch (authControllers.forgotPassword));

export default function (app) {
    app.use('/auth', authRouter);
}
