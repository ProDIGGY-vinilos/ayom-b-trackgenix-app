import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.base': 'Name must be of type text',
      'string.alphanum': 'Name cannot contain special characters',
      'string.empty': 'Name cannot be an empty field',
      'string.pattern.base': 'Name must be of type text',
      'any.required': 'Name is required'
    }),
  lastName: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i)
    .required()
    .messages({
      'string.base': 'Last Name must be of type text',
      'string.alphanum': 'Last Name cannot contain special characters',
      'string.empty': 'Last Name cannot be an empty field',
      'string.pattern.base': 'Last Name must be of type text',
      'any.required': 'Last Name is required'
    }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'Phone must be of type number',
      'string.length': 'Phone must be 10 characters long',
      'string.empty': 'Phone cannot be an empty field',
      'string.pattern.base': 'Phone must be of type number',
      'any.required': 'Phone is required'
    }),
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
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9])$/)
    .required()
    .messages({
      'string.base': 'Password must be of type text',
      'string.alphanum': 'Password cannot contain special characters',
      'string.min': 'Password Length must be at least 8 characters long',
      'string.empty': 'Password cannot be an empty field',
      'string.pattern.base': `"Password" should be letters, numbers and minimum 8 characters`,
      'any.required': 'Password is required'
    })
});
