// auth.routes.js
import { Router } from "express";
import { signup, logout } from "./auth.controllers.js";
import { tryCatch } from "../../utils/TryCatch.js";

const authRouter = Router();

authRouter.get("/", (req, res) => {
    res.json({ message: "Hello from auth!" });
});

// authRouter.post("/login", tryCatch(login));

authRouter.post("/signup", tryCatch(signup));

authRouter.post("/logout", tryCatch(logout));

export default function (app) {
    app.use("/auth", authRouter);
}
