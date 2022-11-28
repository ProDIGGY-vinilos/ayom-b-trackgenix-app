import Joi from 'joi';

export const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be of type text',
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .alphanum()
    .min(8)
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required()
    .messages({
      'string.base': 'Password must be of type text',
      'string.alphanum': 'Password cannot contain special characters',
      'string.min': 'Password must be at least 8 characters long',
      'string.empty': 'Password cannot be an empty field',
      'string.pattern.base': 'Password must be of type text and number',
      'any.required': 'Password is required'
    })
});
