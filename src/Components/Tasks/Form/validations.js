import joi from 'joi';

const schema = joi.object({
  description: joi
    .string()
    .required()
    .trim()
    .pattern(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3)
    .messages({
      'string.base': `"Description" must be a text`,
      'string.empty': `"Description" cannot be empty`,
      'string.min.base': `"Description" must have a minimum of 3 characters`,
      'any.required': `"Description is required`,
      'string.pattern.base': `"Description" can't have only numbers or special characters`
    })
});

export default schema;
