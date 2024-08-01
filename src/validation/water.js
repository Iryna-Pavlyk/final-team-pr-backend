import Joi from 'joi';
export const createWaterSchema = Joi.object({
  waterRate: Joi.number().integer().min(50).max(2000).required(),
  time: Joi.string()
    .pattern(new RegExp('^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'))
    .required(),
  userId: Joi.string(), //.required(),
});
export const updateWaterSchema = Joi.object({
  waterRate: Joi.number().integer().min(50).max(2000),
  time: Joi.string().pattern(
    new RegExp('^(?:0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$'),
  ),
});
