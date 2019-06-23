import * as yup from 'yup'

export const requiredMessage = 'This is required'
export const positiveMessage = 'This should be positive value'
export const numberMessage = 'This should be number'
export const emailMessage = 'This should be valid email'

const incomesExpensesBase = {
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
  taxRate: yup.mixed().oneOf([0, 9, 21])
}
const incomesExpensesShape = yup
  .array()
  .of(yup.object().shape(incomesExpensesBase))

const clientShape = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(emailMessage),
  phone: yup.string(),
  address: yup.string(),
  postalCode: yup.string()
})

const basicInfoShape = {
  invoiceNumber: yup.string().required(requiredMessage),
  invoiceDate: yup.string().nullable(true),
  name: yup.string().required(requiredMessage),
  projectDate: yup
    .string()
    .nullable(true)
    .required(requiredMessage),
  incomes: incomesExpensesShape,
  expenses: incomesExpensesShape
}

const addProjectValidationSchema = yup.object().shape({
  ...basicInfoShape,
  client: clientShape.nullable(true)
})

const editBasicInfoValidationSchema = yup.object().shape({
  ...basicInfoShape
})

const editIncomesSchema = yup.object().shape({
  incomes: incomesExpensesShape
})
const editExpensesSchema = yup.object().shape({
  expenses: incomesExpensesShape
})

export const projectValidationSchemas = {
  addProjectValidationSchema,
  editBasicInfoValidationSchema,
  editIncomesSchema,
  editExpensesSchema
}
