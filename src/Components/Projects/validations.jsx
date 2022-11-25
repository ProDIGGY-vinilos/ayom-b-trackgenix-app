import Joi from 'joi';

const employeeValidation = Joi.object({
  employee: Joi.string().required(),
  role: Joi.string().required().valid('DEV', 'QA', 'TL', 'PM'),
  rate: Joi.number().positive().required().messages({
    'string.empty': 'Rate cannot be an empty field',
    'number.pattern.base': 'Rate must be a positive number',
    'any.required': 'Rate is required'
  })
});

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Project name is required',
      'string.pattern.base': 'Project name must be at least 1 letter',
      'string.min': 'Project name must be at least 3 characters long',
      'any.required': 'Project name is required'
    }),
  description: Joi.string()
    .min(5)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Description cannot be an empty field',
      'string.pattern.base': 'Description must be at least 1 letter',
      'string.min': 'Description   must be 5 characters long',
      'any.required': 'Description is required'
    }),
  startDate: Joi.date().required().messages({
    'date.base': 'Start date is required'
  }),
  endDate: Joi.date().greater(Joi.ref('startDate')).messages({
    'date.greater': 'End date must be later than start date',
    'date.base': 'End date is required'
  }),
  clientName: Joi.string()
    .min(3)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Client cannot be an empty field',
      'string.pattern.base': 'Client name must be at least 1 letter',
      'string.min': 'Client must be at least 3 characters long	',
      'any.required': 'Client name is required'
    }),
  employees: Joi.array().items(employeeValidation)
});
