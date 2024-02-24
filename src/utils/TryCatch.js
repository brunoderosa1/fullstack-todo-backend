/**
 * The `tryCatch` function is an asynchronous wrapper that catches errors thrown by a controller
 * function and passes them to the next middleware.
 * @param controller - The `controller` parameter in the `tryCatch` function is a function that handles
 * the main logic or functionality of a specific route or endpoint in an Express application. It
 * typically takes `req`, `res`, and `next` as parameters to interact with the request, response, and
 * next middleware function
 * @returns The `tryCatch` function is returning an asynchronous function that takes `req`, `res`, and
 * `next` as parameters. Inside this function, it tries to await the `controller` function with the
 * provided parameters. If an error occurs during the execution of the `controller` function, it
 * catches the error and passes it to the `next` function.
 */
export const tryCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
        return next(error);
    }
};
    