import errorsHandler from "../errorsHandler.js";

describe("errorsHandler", () => {
    it("returns a response with error details when error has name, status, and message", () => {
        const mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const mockNext = vi.fn();

        const err = new Error("Test error");
        err.name = "TestError";
        err.status = 400;
        err.stack = "Error stack trace";

        errorsHandler(err, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({
            message: "Test error",
            name: "TestError",
            status: 400,
            stack: "Error stack trace",
        });
        expect(mockNext).not.toHaveBeenCalled();
    });

    it("returns a 500 response when error does not have name, status, and message", () => {
        const mockRes = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        const mockNext = vi.fn();

        const err = new Error("Test error");

        errorsHandler(err, {}, mockRes, mockNext);

        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Test error" });
        expect(mockNext).not.toHaveBeenCalled();
    });
});
