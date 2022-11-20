import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i)
    .required()
    .empty()
    .message({
      'string.alphanum': 'Name cannot contain special characters.',
      'string.pattern.base': 'Name can only contain letters.',
      'string.empty': 'Name cannot be an empty field.',
      'any.required': 'Name is requiered.'
    }),
  lastName: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i)
    .required()
    .empty()
    .message({
      'string.alphanum': 'Name cannot contain special characters.',
      'string.pattern.base': 'Name can only contain letters.',
      'string.empty': 'Name cannot be an empty field.',
      'any.required': 'Name is requiered.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .empty()
    .message({
      'string.email': 'Invalid email.',
      'string.empty': 'Email cannot be an empty field.',
      'any.required': 'Email is requiered.'
    }),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .required()
    .empty()
    .message({
      'string.alphanum': 'Password cannot contain special characters.',
      'string.empty': 'Password cannot be an empty field.',
      'any.required': 'Password is requiered.'
    })
});

export default schema;
