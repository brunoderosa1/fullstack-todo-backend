/**
 * The function `errorsHandler` is an error handling middleware in JavaScript that logs errors and
 * sends a JSON response with error details.
 * @param err - The `err` parameter in the `errorsHandler` function represents the error object that is
 * passed to the error handling middleware in an Express application. This object typically contains
 * information about the error that occurred, such as its name, message, status, and stack trace. The
 * function checks if the error object
 * @param req - The `req` parameter in the `errorsHandler` function typically represents the HTTP
 * request object, which contains information about the incoming request such as headers, parameters,
 * and body data. It is used to access and manipulate the request details within the error handling
 * function.
 * @param res - The `res` parameter in the `errorsHandler` function is the response object representing
 * the HTTP response that an Express app sends when it gets an HTTP request. It is used to send a
 * response back to the client with data or error messages.
 * @param next - The `next` parameter in the `errorsHandler` function is a callback function that is
 * used to pass control to the next middleware function in the stack. It is typically used to invoke
 * the next middleware function in the chain. If an error occurs within the current middleware function
 * and you want to skip to
 * @returns If the `err` object has properties `name`, `status`, and `message`, then a JSON response
 * containing those properties along with the `stack` property will be returned with the status code
 * specified in `err.status`. If any of these properties are missing, a generic error response with
 * status code 500 will be returned containing the `message` property of the `err` object.
 */
export default function errorsHandler(err, req, res, next) {

    if (err.name && err.status && err.message) {
        return res
            .status(err.status)
            .json({
                message: err.message,
                name: err.name,
                status: err.status,
                stack: err.stack,
            });
    }

    return res.status(500).json({ message: err.message });
}
