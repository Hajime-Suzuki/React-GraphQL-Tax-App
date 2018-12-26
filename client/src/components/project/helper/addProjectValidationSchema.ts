import * as yup from 'yup'

const requiredMessage = 'This is required'
const positiveMessage = 'This should be positive value'
const numberMessage = 'This should be number'
const emailMessage = 'This should be valid email'

const incomesExpensesSchema = {
  name: yup.string().required(requiredMessage),
  price: yup
    .number()
    .positive(positiveMessage)
    .typeError(numberMessage)
    .required(requiredMessage),
  quantity: yup
    .number()
    .positive(positiveMessage)
    .required(requiredMessage)
    .typeError(numberMessage),
  taxRate: yup.mixed().oneOf([0, 6, 21])
}

const incomesShape = yup.object().shape(incomesExpensesSchema)
const expenseShape = yup.object().shape(incomesExpensesSchema)

const clientShape = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(emailMessage),
  phone: yup.string(),
  address: yup.string(),
  postalCode: yup.string()
})

export const addProjectValidationSchema = yup.object().shape({
  invoiceNumber: yup.string().required(requiredMessage),
  invoiceDate: yup.string().nullable(),
  name: yup.string().required(requiredMessage),
  projectDate: yup
    .string()
    .nullable()
    .required(requiredMessage),
  incomes: yup.array().of(incomesShape),
  expenses: yup.array().of(expenseShape),
  client: clientShape.nullable()
})
