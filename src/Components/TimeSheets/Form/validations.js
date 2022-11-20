import Joi from 'joi';

/* const employeesValidation = Joi.object({
  name: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i, 'only letters')
    .required(),
  lastName: Joi.string()
    .alphanum()
    .pattern(/^([^0-9]*)$/i, 'only letters')
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/, 'only numbers')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .alphanum()
    .pattern(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/, 'Letters, numbers and minimum 8 characters')
    .required()
});

const employeeForProjectValidation = Joi.object({
  employee: employeesValidation.required(),
  role: Joi.string().valid('DEV', 'QA', 'PM', 'TL').required(),
  rate: Joi.number().required()
});
const projectValidation = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  clientName: Joi.string().min(3).required(),
  employees: Joi.array().items(employeeForProjectValidation).required()
});

export const timeSheetValidation = Joi.object({
  description: Joi.string().max(100).required(),
  date: Joi.date().required(),
  task: Joi.string()
    .required()
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3),
  project: projectValidation.required(),
  employee: employeesValidation.required(),
  hours: Joi.number().integer().positive().required()
}); */

export const timeSheetValidation = Joi.object({
  description: Joi.string().max(100).required(),
  date: Joi.date().required(),
  task: Joi.string()
    .required()
    .trim()
    .regex(/^(?=.*[a-zA-Z].*)([\w\s\W]+)$/)
    .min(3),
  project: Joi.string().length(24).required(),
  employee: Joi.string().length(24).required(),
  hours: Joi.number().integer().positive().required()
});
