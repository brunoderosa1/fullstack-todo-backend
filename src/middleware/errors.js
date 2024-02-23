export class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.status = 404;
        this.message = message;
        this.name = "NotFoundError";
    }
}

export class DbError extends Error {
    constructor(message) {
        super(message);
        this.status = 500;
        this.message = message;
        this.name = "DbError";
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.status = 400;
        this.message = message;
        this.name = "ValidationError";
    }
}

export class UnauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.status = 401;
        this.message = message;
        this.name = "UnauthorizedError";
    }
}

export class ForbiddenError extends Error {
    constructor(message) {
        super(message);
        this.status = 403;
        this.message = message;
        this.name = "ForbiddenError";
    }
}

export function returnError(err, res) {
    if (err.name && err.status && err.message) {
        return res.status(err.status).json({ message: err.message, name: err.name, stack: err.stack, status: err.status });
    }

    return res.status(500).json({ message: err.message });
}