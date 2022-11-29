import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.alphanum': 'Name cannot contain special characters',
      'string.min': 'Name must be at least 3 characters long',
      'string.pattern.base': 'Name must be of type text',
      'string.empty': 'Name cannot be an empty field',
      'any.required': 'Name is requiered'
    }),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.alphanum': 'Last Name cannot contain special characters',
      'string.min': 'Last Name must be at least 3 characters long',
      'string.pattern.base': 'Last Name must be of type text',
      'string.empty': 'Last Name cannot be an empty field',
      'any.required': 'Last Name is requiered'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email is requiered'
    }),
  password: Joi.string().alphanum().min(8).required().messages({
    'string.alphanum': 'Password cannot contain special characters',
    'string.min': 'Password must be at least 8 characters long',
    'string.empty': 'Password cannot be an empty field',
    'any.required': 'Password is requiered'
  })
});
