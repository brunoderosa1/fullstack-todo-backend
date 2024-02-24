import authService from "../../lib/auth";

export async function login(email, password) {
    return await authService.login(email, password);
}

export async function signup(email, password) {
    return await authService.signup(email, password);
}

export async function logout(token) {
    return authService.logout(token);
}

export async function verifyIdToken(token) {
    return authService.verifyIdToken(token);
}