import { authService } from "../../lib/auth.js";

export async function login(email, password) {
    return authService.login(email, password);
}

export async function signup(email, password) {
    return authService.signup(email, password);
}

export async function logout(token) {
    return authService.logout(token);
}

export async function verifyIdToken(token) {
    return authService.verifyIdToken(token);
}
