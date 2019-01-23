import * as yup from 'yup'
import {
  emailMessage,
  requiredMessage
} from 'src/components/project/helper/validationSchemas'

const addClientSchema = yup.object().shape({
  client: yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string(),
    email: yup.string().email(emailMessage),
    phone: yup.string(),
    address: yup.string(),
    postalCode: yup.string()
  })
})

const editClientSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string(),
  email: yup
    .string()
    .email(emailMessage)
    .required(requiredMessage),
  phone: yup.string(),
  address: yup.string(),
  postalCode: yup.string()
})

export const clientValidationSchemas = {
  addClientSchema,
  editClientSchema
}
