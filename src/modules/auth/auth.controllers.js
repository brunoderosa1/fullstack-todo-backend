import { login, signup, logout } from "./auth.service.js";

export async function login(req, res) {
    const { email, password } = req.body;
    const token = await login(email, password);
    res.json({ token });
}

export async function signup(req, res) {
    const { email, password } = req.body;
    const token = await signup(email, password);
    res.json({ token });
}

export async function logout(req, res) {
    const { token } = req.body;
    const result = await logout(token);
    res.json({ result });
}

