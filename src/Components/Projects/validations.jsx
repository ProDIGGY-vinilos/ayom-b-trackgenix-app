import Joi from 'joi';

const employeeValidation = Joi.object({
  employee: Joi.string().required(),
  role: Joi.string().required().valid('DEV', 'QA', 'TL', 'PM'),
  rate: Joi.number().positive().required().messages({
    'string.empty': 'Rate required',
    'number.pattern.base': 'Rate should be positive numbers only',
    'any.required': 'Rate required'
  })
});

export const schema = Joi.object({
  name: Joi.string()
    .min(3)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Name required',
      'string.pattern.base': 'Name should have letters only',
      'string.min': 'Name should have a minimum length of 3 characters',
      'any.required': 'Name required'
    }),
  description: Joi.string()
    .min(5)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Description required',
      'string.pattern.base': 'Name should have letters only',
      'string.min': 'Description should have a minimum length of 5 characters',
      'any.required': 'Description required'
    }),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')).messages({
    'date.greater': 'End date must be newer than start date'
  }),
  clientName: Joi.string()
    .min(3)
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .required()
    .messages({
      'string.empty': 'Client name required',
      'string.pattern.base': 'Client name should have letters only',
      'string.min': 'Client name should have a minimum length of 2 characters',
      'any.required': 'Client name required'
    }),
  employees: Joi.array().items(employeeValidation)
});
