import {tryCatch} from "../TryCatch.js"; // Adjust the import path to where your tryCatch function is located

describe("tryCatch", () => {
    it("should catch errors thrown by the controller and pass them to next", async () => {
        const mockController = vi.fn().mockImplementation(async () => {
            throw new Error("Controller error");
        });

        const req = {};
        const res = {};

        const next = vi.fn();

        const wrappedController = await tryCatch(mockController);

        await wrappedController(req, res, next);

        expect(next).toHaveBeenCalledWith(new Error("Controller error"));
    });

    it("should not call next if the controller does not throw an error", async () => {
        
        const mockController = vi.fn().mockImplementation(async () => {
            return (req, res) => {
                res.status(200).send('Not an error')
            }
        });

        const req = {};
        const res = {};

        const next = vi.fn();

        const wrappedController = await tryCatch(mockController);

        await wrappedController(req, res, next);

        expect(next).not.toHaveBeenCalled();
    });
});
