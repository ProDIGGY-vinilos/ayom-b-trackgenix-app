import joi from 'joi';

const schema = joi.object({
  description: joi
    .string()
    .required()
    .trim()
    .pattern(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3)
    .messages({
      'string.base': 'Description must be of type text',
      'string.empty': 'Description cannot be an empty field',
      'string.min.base': 'Description must be at least 3 characters long',
      'any.required': 'Description is required',
      'string.pattern.base': 'Description cannot contain special characters or numbers'
    })
});

export default schema;
