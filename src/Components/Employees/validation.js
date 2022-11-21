import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i, 'only letters')
    .required()
    .messages({
      'string.base': `"Name" should be a type of 'text'`,
      'string.alphanum': `"Name" should be only characters`,
      'string.empty': `"Name" cannot be an empty field`,
      'string.pattern.name': `"Name" should be only letters`,
      'any.required': `"Name" is a required field`
    }),
  lastName: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i, 'only letters')
    .required()
    .messages({
      'string.base': `"Lastname" should be a type of 'text'`,
      'string.alphanum': `"Lastname" should be only characters`,
      'string.empty': `"Lastname" cannot be an empty field`,
      'string.pattern.name': `"Lastname" should be only letters`,
      'any.required': `"Lastname" is a required field`
    }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/, 'only numbers')
    .required()
    .messages({
      'string.base': `"Phone" should be a type of 'text'`,
      'string.length': `"Phone" should be 10 numbers`,
      'string.empty': `"Phone" cannot be an empty field`,
      'string.pattern.name': `"Phone" should be only numbers`,
      'any.required': `"Phone" is a required field`
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': `"Email" should be a type of 'text'`,
      'string.email': `"Email" should be valid email format`,
      'string.empty': `"Email" cannot be an empty field`,
      'any.required': `"Name" is a required field`
    }),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters')
    .required()
    .messages({
      'string.base': `"Password" should be a type of 'text'`,
      'string.alphanum': `"Password" should be letters and numbers`,
      'string.empty': `"Password" cannot be an empty field`,
      'string.pattern.name': `"Password" should be letters, numbers and minimum 8 characters`,
      'any.required': `"Password" is a required field`
    })
});
