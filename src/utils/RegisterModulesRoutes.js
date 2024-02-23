import path from "path";
import fs from "fs";
const baseDir = process.cwd();

export default async function registerModulesRoutes(app, moduleDirectory) {
    const modules = fs.readdirSync(moduleDirectory);
    const filteredModules = modules.filter(
      (dir) => dir.startsWith(".") === false
    );
  
    for (const moduleName of filteredModules) {
      const modulePath = path.join(moduleDirectory, moduleName);
      const routesFile = path.join(modulePath, moduleName + ".routes.js");
      const routesFilePath = path.resolve(baseDir, modulePath, moduleName + ".routes.js");
      console.log("🚀 ~ registerModulesRoutes ~ routesFilePath:", routesFilePath)
      console.log("🚀 ~ registerModulesRoutes ~ baseDir:", baseDir)
      const routesUrl = new URL(`file:///${routesFilePath}`);
  
      if (fs.existsSync(routesFile)) {
        const moduleRoutes = await import(routesUrl.href);
        if (moduleRoutes && typeof moduleRoutes.default === "function") {
          const router = moduleRoutes.default; // Call the exported function to get the router
          router(app); // Mount the router at the root path or specify a different path if needed
          console.log(`Registered routes from module '${moduleName}'`);
        } else {
          console.warn(`No default export or default export is not a function in module '${moduleName}'`);
        }
      } else {
        console.warn(`No routes file found for module '${moduleName}'`);
      }
    }
  }
  