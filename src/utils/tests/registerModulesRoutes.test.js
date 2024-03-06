import { test } from "vitest";
import fs from "fs";
import path from "path";
import registerModulesRoutes from "../RegisterModulesRoutes.js";

// Mocking fs.readdirSync and fs.existsSync
const mockReadDirSync = vi.fn();
const mockExistsSync = vi.fn();
fs.readdirSync = mockReadDirSync;
fs.existsSync = mockExistsSync;

// Mocking console.log and console.warn to avoid actual console output during tests
global.console = {
    log: vi.fn(),
    warn: vi.fn(),
};

test("registers routes from valid modules", async () => {
    // Mocking the behavior of fs.readdirSync and fs.existsSync
    mockReadDirSync.mockReturnValue(["auth"]);
    mockExistsSync.mockReturnValue(true);

    const mockApp = { use: vi.fn() };
    const modulesDirectory = "./src/modules";
    
    await registerModulesRoutes(mockApp, modulesDirectory);

    expect(mockReadDirSync).toHaveBeenCalledWith(modulesDirectory);
    expect(mockExistsSync).toHaveBeenCalledWith(
        expect.stringContaining("auth.routes.js")
    );
    expect(console.log).toHaveBeenCalledWith(
        "Registered routes from module 'auth'"
    );
    expect(mockApp.use).toHaveBeenCalled();
});

test("warns when no routes file is found", async () => {
    mockReadDirSync.mockReturnValue(["noRoutesModule"]);
    mockExistsSync.mockReturnValue(false);

    const mockApp = { use: vi.fn() };
    const modulesDirectory = "./modules";

    await registerModulesRoutes(mockApp, modulesDirectory);

    expect(mockReadDirSync).toHaveBeenCalledWith(modulesDirectory);
    expect(mockExistsSync).toHaveBeenCalledWith(
        expect.stringContaining("noRoutesModule.routes.js")
    );
    expect(console.warn).toHaveBeenCalledWith(
        "No routes file found for module 'noRoutesModule'"
    );
    expect(mockApp.use).not.toHaveBeenCalled();
});

