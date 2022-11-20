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
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/, 'only numbers')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters')
    .required()
});
