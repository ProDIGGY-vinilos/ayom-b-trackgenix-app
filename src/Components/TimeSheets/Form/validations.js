import Joi from 'joi';

export const timeSheetValidation = Joi.object({
  description: Joi.string()
    .required()
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3)
    .messages({
      'string.empty': 'Description cannot be an empty field',
      'string.pattern.base': 'Description should contain at least one letter',
      'string.min': 'Description must be at least 3 characters long	',
      'any.required': 'Description is required'
    }),
  date: Joi.date().required().messages({
    'date.base': 'Date is required',
    'any.message': 'Date is required'
  }),
  task: Joi.string().length(24).required().messages({
    'any.required': 'Task is required'
  }),
  project: Joi.string().length(24).required().messages({
    'any.required': 'Project is required'
  }),
  employee: Joi.string().length(24).required().messages({
    'any.required': 'Employee is required'
  }),
  hours: Joi.number().integer().positive().required().messages({
    'number.base': 'Hours must be of type number',
    'number.integer': 'Hours must be an integer',
    'number.positive': 'Hours must be a positive number',
    'any.required': 'Hours is required'
  })
});
