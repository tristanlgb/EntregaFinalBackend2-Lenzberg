export const generateCustomResponses = (_, res, next) => {
    res.sendSuccess = (payload) => res.status(200).json({
        status: "success",
        message: "Request processed successfully.",
        payload
    });

    res.sendCreated = (payload) => res.status(201).json({
        status: "success",
        message: "A resource was created as a result of the request.",
        payload
    });

    res.sendBadRequest = (error) => res.status(400).json({
        status: "error",
        message: "The request is malformed.",
        error: error?.message || error
    });

    res.sendUnauthorized = (error) => res.status(401).json({
        status: "error",
        message: "Authentication is required, but it was not provided or is incorrect.",
        error: error?.message || error
    });

    res.sendForbidden = (error) => res.status(403).json({
        status: "error",
        message: "The server understands the request but refuses to authorize it.",
        error: error?.message || error
    });

    res.sendNotFound = (error) => res.status(404).json({
        status: "error",
        message: "The requested resource does not exist.",
        error: error?.message || error
    });

    res.sendServerError = (error) => res.status(500).json({
        status: "error",
        message: "Generic server error.",
        error: error?.message || error
    });

    next(); // Continue to the next middleware or route handler
};
