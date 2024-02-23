import registerModulesRoutes from "./RegisterModulesRoutes";
import express from "express";
import fs from "fs";

describe("registerModulesRoutes", () => {
  let app;

  beforeEach(() => {
    app = express();
  });

  test("registers routes from valid module", async () => {
    const moduleDirectory = "./modules";
    fs.existsSync = jest.fn().mockReturnValue(true);

    await registerModulesRoutes(app, moduleDirectory);

    expect(fs.existsSync).toHaveBeenCalledWith(
      expect.stringContaining("module1.routes.js")
    );
    expect(app._router.stack).toHaveLength(1);
  });

  test("logs warning if routes file does not exist", async () => {
    const moduleDirectory = "./modules";
    fs.existsSync = jest.fn().mockReturnValue(false);

    console.warn = jest.fn();

    await registerModulesRoutes(app, moduleDirectory);

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("No routes file found")
    );
  });

  test("logs warning if default export is not a function", async () => {
    const moduleDirectory = "./modules";
    fs.existsSync = jest.fn().mockReturnValue(true);
    jest.mock("./modules/module1/module1.routes", () => ({
      default: "not a function",
    }));

    console.warn = jest.fn();

    await registerModulesRoutes(app, moduleDirectory);

    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("default export is not a function")
    );
  });
});
