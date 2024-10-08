import Joi from 'joi';
import { emailRegexp, userGender } from '../constants/user.js';

export const userSignupSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.pattern.base': 'Email format should be like "example123@mail.com".'
  }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password should have at least {6} characters'}),
});

export const userSigninSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required().messages({
        'string.pattern.base': 'Email format should be like "example123@mail.com".'
  }),
    password: Joi.string().min(6).required().messages({
        'string.min': 'Password should have at least {6} characters'}),
});

export const userInfoSchema = Joi.object({
    gender: Joi.string().valid(...userGender),
    name: Joi.string().min(3).max(30).messages({
        'string.base': 'Name should be a string',
        'string.min': 'Name should have at least {3} characters',
        'string.max': 'Name should have at most {30} characters',}),
    weight: Joi.number().min(0).max(300).messages({
        'string.base': 'Weight should be a number between 0 and 300 kg',
    }),
    sportTime: Joi.number().min(0).max(10).messages({
        'string.base': 'Time of sport activities should be a number between 0 and 10 hours',
    }),
    waterRate: Joi.number().integer().min(0).max(99000).messages({
        'string.base': 'Water to drink should be a number between 0 and 99000 L',
    }),
    avatar: Joi.string(),
});
