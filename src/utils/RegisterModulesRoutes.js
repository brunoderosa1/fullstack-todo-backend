import path from "path";
import fs from "fs";
const baseDir = process.cwd();

/**
 * The function `registerModulesRoutes` asynchronously registers routes from modules located in a
 * specified directory within an Express app.
 * @param app - The `app` parameter in the `registerModulesRoutes` function is typically an instance of
 * an Express application. It is used to register routes from different modules dynamically based on
 * the module files present in the specified directory.
 * @param modulesDirectory - The `moduleDirectory` parameter in the `registerModulesRoutes` function is
 * the directory path where your modules are located. This function reads the modules from this
 * directory and registers their routes in your application.
 */
export default async function registerModulesRoutes(app, modulesDirectory) {
  const modules = fs.readdirSync(modulesDirectory);
  const filteredModules = modules.filter(
    (dir) => dir.startsWith(".") === false
  );

  for (const moduleName of filteredModules) {
    const modulePath = path.join(modulesDirectory, moduleName);
    const routesFile = path.join(modulePath, moduleName + ".routes.js");
    const routesFilePath = path.resolve(
      baseDir,
      modulePath,
      moduleName + ".routes.js"
    );
    const routesUrl = new URL(`file:///${routesFilePath}`);

    if (fs.existsSync(routesFile)) {
      const moduleRoutes = await import(routesUrl.href);
      if (moduleRoutes && typeof moduleRoutes.default === "function") {
        const router = moduleRoutes.default; 
        router(app); // Mount the router at the root path or specify a different path if needed
        console.log(`Registered routes from module '${moduleName}'`);
      } else {
        console.warn(
          `No default export or default export is not a function in module '${moduleName}'`
        );
      }
    } else {
      console.warn(`No routes file found for module '${moduleName}'`);
    }
  }
}
