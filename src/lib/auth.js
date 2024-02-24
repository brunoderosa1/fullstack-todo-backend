import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";

const app = initializeApp({
    credential: cert("../credentials.json"),
});


class AuthService {
    async login(email, password) {
        const user = await getAuth().getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        const userRecord = await getAuth().getUser(user.uid);
        if (!userRecord) {
            throw new Error("User not found");
        }
        const validPassword = await admin
            .getAuth()
            .verifyPassword(userRecord, password);
        if (!validPassword) {
            throw new Error("Invalid password");
        }
        const token = await getAuth().createCustomToken(userRecord.uid);
        return token;
    }

    async signup(email, password) {
        const user = await getAuth().createUser({
            email,
            password,
        });
        if (!user) {
            throw new Error("User not created");
        }
        const token = await getAuth().createCustomToken(user.uid);
        return token;
    }

    async logout(token) {
        const decodedToken = await getAuth().verifyIdToken(token);
        const uid = decodedToken.uid;
        await getAuth().revokeRefreshTokens(uid);
        return true;
    }

    async verifyIdToken(token) {
        const decodedToken = await getAuth().verifyIdToken(token);
        return decodedToken;
    }
}
