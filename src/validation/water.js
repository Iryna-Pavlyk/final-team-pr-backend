import Joi from 'joi';

const isoDateFullRegex =
  /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])T([01]\d|2[0-3]):([0-5]\d)$/;
const isoDateDayRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
const isoDateMonthRegex = /^\d{4}-(0[1-9]|1[0-2])$/;

export const getDayWaterSchema = Joi.object({
  date: Joi.string().pattern(isoDateDayRegex).required(),
  waterRate: Joi.number().min(0).required(),
});

export const getMonthWaterSchema = Joi.object({
  date: Joi.string().pattern(isoDateMonthRegex).required(),
  waterRate: Joi.number().min(0).required(),
});

export const createWaterSchema = Joi.object({
  waterAmount: Joi.number().integer().min(10).max(2000).required(),
  date: Joi.string().pattern(isoDateFullRegex).required(),
});
export const updateWaterSchema = Joi.object({
  waterAmount: Joi.number().integer().min(10).max(2000),
  date: Joi.string().pattern(isoDateFullRegex),
});
