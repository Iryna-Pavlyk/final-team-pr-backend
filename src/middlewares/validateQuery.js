import createHttpError from 'http-errors';

export const validateQuery = (schema) => {
  const func = async (req, res, next) => {
    try {
      await schema.validateAsync(req.query, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const responseError = createHttpError(400, error.message);
      next(responseError);
    }
  };
  return func;
};

export default validateQuery;
