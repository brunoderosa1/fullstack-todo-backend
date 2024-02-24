import { BadRequestError } from "../../utils/errors.js";
import * as authService from "./auth.service.js";

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Email and password are required");
    const token = await authService.login(email, password);
    res.json({ token });
}

export const signup = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Email and password are required");
    const token = await authService.signup(email, password);
    res.json({ token });
}

export const logout = async (req, res, next) => {
    const { token } = req.body;
    const result = await authService.logout(token);
    res.json({ result });
}

