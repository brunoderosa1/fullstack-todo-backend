import { getAuth } from "firebase-admin/auth";

async function getAuthToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("No auth header");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await getAuth().verifyIdToken(token);
        return decodedToken;
    } catch (e) {
        throw new Error("Auth token is not valid");
    }
}
