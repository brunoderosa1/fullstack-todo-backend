import verifyAuthToken from "../verifyAuthToken.js";
import { auth } from "../../lib/firebase.js";
import { UnauthorizedError } from "../../utils/Errors.js";

vi.mock("../lib/firebase.js", () => ({
    auth: {
        verifyIdToken: vi.fn(),
    },
}));

describe("verifyAuthToken", () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            path: "",
            headers: {},
        };
        res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        next = vi.fn();
    });

    it("bypasses authentication for root path", async () => {
        req.path = "/";
        await verifyAuthToken(req, res, next);
        expect(next).toHaveBeenCalled();
    });

    it("throws UnauthorizedError for missing authorization header", async () => {
        await verifyAuthToken(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });

    it("throws UnauthorizedError for missing token", async () => {
        req.headers.authorization = "Bearer";
        await verifyAuthToken(req, res, next);
        expect(next).toHaveBeenCalledWith(expect.any(UnauthorizedError));
    });

    it("successfully verifies a valid token and adds user to req", async () => {
        req.headers.authorization = "Bearer validToken";
        vi.spyOn(auth, 'verifyIdToken').mockResolvedValue({ uid: 'user123' });
        await verifyAuthToken(req, res, next);
        expect(next).toHaveBeenCalled();
        expect(req.user).toEqual({ uid: "user123" });
    });

    it("throws an error if token verification fails", async () => {
        req.headers.authorization = "Bearer invalidToken";
        vi.spyOn(auth, "verifyIdToken").mockRejectedValue(
            new Error("Token verification failed")
        );

        await verifyAuthToken(req, res, next);

        expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
});
