import * as yup from 'yup'

const incomesShape = yup.object().shape({
  name: yup
    .string()
    .min(3)
    .required(),
  // price: yup.number().min(0),
  // quantity: yup.number('test'),
  taxRate: yup.mixed().oneOf([0, 6, 21])
})
const expenseShape = yup.object().shape({
  name: yup.string(),
  // price: yup.number().min(0),
  // quantity: yup.number('test'),
  taxRate: yup.mixed().oneOf([0, 6, 21])
})

export const addProjectSchema = yup.object().shape({
  invoiceNumber: yup.string().required(),
  invoiceDate: yup.string(),
  name: yup.string().required(),
  projectDate: yup.string().required(),
  incomes: yup
    .array()
    .of(incomesShape)
    .required(),
  expenses: yup.array().of(expenseShape)
})
