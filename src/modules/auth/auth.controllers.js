import * as authServices from "./auth.service.js";

export async function login(req, res) {
    const { email, password } = req.body;
    const token = await authServices.login(email, password);
    res.json({ token });
}

export async function signup(req, res) {
    const { email, password } = req.body;
    const token = await authServices.signup(email, password);
    res.json({ token });
}

export async function logout(req, res) {
    const { token } = req.body;
    const result = await authServices.logout(token);
    res.json({ result });
}

export async function forgotPassword(req, res) {  
    const { email } = req.body;
    const result = await authServices.forgotPassword(email);
    res.json({ result });
}
