import { getAuth } from "firebase-admin/auth";
import { UnauthorizedError } from "../utils/errors";

export async function verifyAuthToken(req, res, next) {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            throw new UnauthorizedError("No authorization header");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new UnauthorizedError("No token");
        }
        const decodedToken = await getAuth().verifyIdToken(token);
        req.user = decodedToken;
    } catch (error) {
        next(error);
    }
}
