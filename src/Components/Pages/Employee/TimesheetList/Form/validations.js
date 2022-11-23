import Joi from 'joi';

export const timeSheetValidation = Joi.object({
  description: Joi.string()
    .required()
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3)
    .messages({
      'string.empty': 'Description is required',
      'string.pattern.base': 'Description should contain at least one letter',
      'string.min': 'Description should have at least 3 characters',
      'any.required': 'Description is required'
    }),
  date: Joi.date().required().messages({
    'date.base': 'Date should have a correct format',
    'any.message': 'Date is required'
  }),
  task: Joi.string().length(24).required().messages({
    'any.required': 'Task is required'
  }),
  project: Joi.string().length(24).required().messages({
    'any.required': 'Project is required'
  }),
  hours: Joi.number().integer().positive().required().messages({
    'number.base': 'Hours should be a number',
    'number.integer': 'Hours should be integer',
    'number.positive': 'Hours should be positive',
    'any.required': 'Hours is required'
  })
});
