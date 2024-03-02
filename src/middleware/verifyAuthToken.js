import { getAuth } from "firebase-admin/auth";
import { UnauthorizedError } from "../utils/Errors.js";
import { auth } from "../lib/firebase.js";

export default async function verifyAuthToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new UnauthorizedError("No authorization header");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError("No token");
        }
        const decodedToken = await auth.verifyIdToken(token);
        req.user = decodedToken;
        next()
    } catch (error) {
        next(error);
    }
}
