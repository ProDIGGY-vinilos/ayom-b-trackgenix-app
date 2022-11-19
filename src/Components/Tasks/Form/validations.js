import joi from 'joi';

const schema = joi.object({
  description: joi
    .string()
    .required()
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3)
});

export default schema;
