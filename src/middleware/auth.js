import * as admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert('../credentials.json'),
});

async function getAuthToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        throw new Error("No auth header");
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        return decodedToken;
    } catch (e) {
        throw new Error("Auth token is not valid");
    }
}