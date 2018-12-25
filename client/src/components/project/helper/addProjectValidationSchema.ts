import * as yup from 'yup'

const requiredMessage = 'This is required'
const positiveMessage = 'This should be positive value'
const numberMessage = 'This should be number'
const emailMessage = 'This should be valid email'

const incomesShape = yup.object().shape({
  name: yup.string().required(requiredMessage),
  price: yup
    .number()
    .positive(positiveMessage)
    .typeError(numberMessage),
  quantity: yup
    .number()
    .positive(positiveMessage)
    .typeError(numberMessage),
  taxRate: yup.mixed().oneOf([0, 6, 21])
})
const expenseShape = yup.object().shape({
  name: yup.string(),
  price: yup
    .number()
    .positive(positiveMessage)
    .typeError(numberMessage),
  quantity: yup
    .number()
    .positive(positiveMessage)
    .typeError(numberMessage),
  taxRate: yup.mixed().oneOf([0, 6, 21])
})

const clientShape = yup.object().shape({
  firstName: yup.string().required(requiredMessage),
  lastName: yup.string().required(requiredMessage),
  email: yup.string().email(emailMessage),
  phone: yup.string(),
  address: yup.string(),
  postalCode: yup.string()
})

export const addProjectSchema = yup.object().shape({
  invoiceNumber: yup.string().required(requiredMessage),
  invoiceDate: yup.string(),
  name: yup.string().required(requiredMessage),
  projectDate: yup.string().required(requiredMessage),
  incomes: yup
    .array()
    .of(incomesShape)
    .required(),
  expenses: yup.array().of(expenseShape),
  client: clientShape
})
