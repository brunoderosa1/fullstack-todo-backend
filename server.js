import express from "express";
import path from "path";
import errorsHandler from "./src/middleware/errorsHandler.js";
import fs from "fs";
const baseDir = process.cwd();

const port = process.env.PORT || 3000;

const app = express();

// async function registerModulesRoutes(app, modulesDirectory) {
//   // Get all module directories
//   const modules = fs
//     .readdirSync(modulesDirectory)
//     .filter(dir => dir.startsWith('.') === false); // Ignore hidden directories
//   console.log("🚀 ~ registerModulesRoutes ~ modules:", modules)

//   // Loop through each module and register routes
//   for (const moduleName of modules) {
//     const modulePath = path.join(modulesDirectory, moduleName);
//     const routesFile = path.join(modulePath, `${moduleName}.routes.js`);

//     // Check if routes file exists
//     if (fs.existsSync(routesFile)) {
//       const moduleRoutes = await import(routesFile);
//       console.log("🚀 ~ registerModuleRoutes ~ moduleRoutes:", moduleRoutes)
//       if (moduleRoutes && typeof moduleRoutes === 'object') {
//         Object.entries(moduleRoutes).forEach(([path, routeHandler]) => {
//           if (typeof routeHandler === 'function') {
//             app.use('/' + moduleName, routeHandler);
//             console.log(`Registered route: ${path} (Module: ${moduleName})`);
//           } else {
//             console.warn(`Invalid route handler in module '${moduleName}': `, routeHandler);
//           }
//         });
//       } else {
//         console.warn(`Invalid routes file in module '${moduleName}': `, moduleRoutes);
//       }
//     } else {
//       console.warn(`No routes file found for module '${moduleName}'`);
//     }
//   }
// }

async function registerModulesRoutes(app, moduleDirectory) {
  const modules = fs.readdirSync(moduleDirectory);
  const filteredModules = modules.filter(
    (dir) => dir.startsWith(".") === false
  );

  for (const moduleName of filteredModules) {
    const modulePath = path.join(moduleDirectory, moduleName);
    const routesFile = path.join(modulePath, moduleName + ".routes.js");
    const routesFilePath = path.resolve(baseDir, modulePath, moduleName + ".routes.js");
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

registerModulesRoutes(app, "./src/modules");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(errorsHandler);

app.listen(port, () => {
  console.log(`App listening at port: ${port}`);
});
