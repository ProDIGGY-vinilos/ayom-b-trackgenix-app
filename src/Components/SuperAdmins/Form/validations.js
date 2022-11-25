import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .pattern(/^([^0-9]*)$/i)
    .required()
    .empty()
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
    .empty()
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
    .empty()
    .messages({
      'string.email': 'Invalid email format',
      'string.empty': 'Email cannot be an empty field',
      'any.required': 'Email is required'
    }),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required()
    .empty()
    .messages({
      'string.alphanum': 'Password cannot contain special characters',
      'string.empty': 'Password cannot be an empty field',
      'any.required': 'Password is required'
    })
});

export default schema;
