export default function errorsHandler(err, req, res, next) {
    if (err.name && err.status && err.message) {
        return res.status(err.status).json({ message: err.message, name: err.name, stack: err.stack, status: err.status });
    }
    
    return res.status(500).json({ message: err.message });
}
