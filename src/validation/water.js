import Joi from 'joi';
import { isoDateFullRegex, isoDateDayRegex, isoDateMonthRegex } from '../constants/regexps.js';

export const getDayWaterSchema = Joi.object({
  date: Joi.string().pattern(isoDateDayRegex).required(),
})

export const getMonthWaterSchema = Joi.object({
  date: Joi.string().pattern(isoDateMonthRegex).required(),
})

export const createWaterSchema = Joi.object({
  waterAmount: Joi.number().integer().min(10).max(2000).required(),
  date: Joi.string().pattern(isoDateFullRegex).required(),
});
export const updateWaterSchema = Joi.object({
  waterAmount: Joi.number().integer().min(10).max(2000),
  date: Joi.string().pattern(isoDateFullRegex),
});
