import { string, object, number } from 'yup'
import {
  requiredMessage,
  positiveMessage
} from '../project/helper/validationSchemas'

export const userExpenseValidation = object().shape({
  name: string().required(requiredMessage),
  date: string().required(requiredMessage),
  price: string().required(requiredMessage),
  quantity: number()
    .positive(positiveMessage)
    .required(requiredMessage),
  taxRate: number().required(requiredMessage)
})
