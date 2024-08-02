import { isValidObjectId } from "mongoose";
import createHttpError from "http-errors";

const isValidId = (req, res, next) => {
    const { userId } = req.params;
    if (!isValidObjectId(userId)) {
        return next(createHttpError(404, `${userId} not valid id`));
    }
    next();
};

export default isValidId;
