import Joi from 'joi';

const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;

export const createWaterSchema = Joi.object({
  waterAmount: Joi.number().integer().min(10).max(2000).required(),
  date: Joi.string()
    .pattern(isoDateRegex)
    .required()
});
export const updateWaterSchema = Joi.object({
  waterAmount: Joi.number().integer().min(10).max(2000),
  date: Joi.string().pattern(isoDateRegex),
});
