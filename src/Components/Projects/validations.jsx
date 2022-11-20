import Joi from 'joi';

const employeeValidation = Joi.object({
  employee: Joi.string().required(),
  role: Joi.string().required().valid('DEV', 'QA', 'TL', 'PM'),
  rate: Joi.number().positive().required().messages({
    'string.empty': 'Rate is required',
    'number.pattern.base': 'Rate should be positive numbers only',
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
      'string.pattern.base': 'Project name should have letters only',
      'string.min': 'Project name should have a minimum length of 3 characters',
      'any.required': 'Project name is required'
    }),
  description: Joi.string()
    .min(5)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.pattern.base': 'Name should have letters only',
      'string.min': 'Description should have a minimum length of 5 characters',
      'any.required': 'Description is required'
    }),
  startDate: Joi.date().required().messages({
    'any.required': 'Start date is required'
  }),
  endDate: Joi.date().greater(Joi.ref('startDate')).messages({
    'date.greater': 'End date must be newer than start date',
    'any.required': 'End date is required'
  }),
  clientName: Joi.string()
    .min(3)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Client name is required',
      'string.pattern.base': 'Client name should have letters only',
      'string.min': 'Client name should have a minimum length of 2 characters',
      'any.required': 'Client name is required'
    }),
  employees: Joi.array().items(employeeValidation)
});
