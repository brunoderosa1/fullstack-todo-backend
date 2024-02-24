import { getAuth } from "firebase-admin/auth";
import { AuthenticationError } from "../utils/errors.js";
class AuthService {
    constructor() {
        this.user = null;      
    }

    async login(email, password) {
        const user = await getAuth().getUserByEmail(email);
        if (!user) {
            throw new AuthenticationError("Email not found");
        }
        const userRecord = await getAuth().getUser(user.uid);
        if (!userRecord) {
            throw new AuthenticationError("User not found");
        }
        const validPassword = await getAuth()
            .verifyPassword(userRecord, password);
        if (!validPassword) {
            throw new AuthenticationError("Invalid password");
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
            throw new AuthenticationError("User not created");
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

export const authService = new AuthService();
