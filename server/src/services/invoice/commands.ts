import axios from 'axios'
import { getGenerateInvoicePayload } from './get-generate-invoice-payload'

export const getInvoicePDF = async (projectId: string, userId: string) => {
  const payload = await getGenerateInvoicePayload(projectId, userId)

  try {
    const { data } = await axios.post<{ url: string }>(
      'https://wk9g6h65fd.execute-api.eu-central-1.amazonaws.com/prod',
      payload,
    )

    return data.url
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}

export const InvoiceCommands = {
  getInvoicePDF,
}
