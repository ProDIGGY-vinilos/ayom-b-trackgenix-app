import Joi from 'joi';

export const schema = Joi.object({
  name: Joi.string()
    .required()
    .alphanum()
    .pattern(/^([^0-9]*)$/i, 'only letters'),
  lastName: Joi.string()
    .required()
    .alphanum()
    .pattern(/^([^0-9]*)$/i, 'only letters'),
  email: Joi.string().required(),
  password: Joi.string().alphanum().required()
});
