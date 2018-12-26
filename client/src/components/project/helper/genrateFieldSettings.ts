const generalFields = [
  { name: 'invoiceNumber', label: 'Invoice Number', required: true },
  { name: 'projectDate', label: 'Project Date', type: 'date', required: true },
  { name: 'invoiceDate', label: 'Invoice Date', type: 'date' },
  { name: 'name', label: 'Name', required: true }
]

const clientFields = [
  { name: 'client.firstName', label: 'First Name' },
  { name: 'client.lastName', label: 'Last Name' },
  { name: 'client.email', label: 'Email' },
  { name: 'client.phone', label: 'Phone' },
  { name: 'client.address', label: 'Address' },
  { name: 'client.postalCode', label: 'Postal Code' }
]

const generateArrayFields = (type: 'incomes' | 'expenses', index: number) => [
  { name: `${type}.${index}.name`, label: 'Name', required: true },
  { name: `${type}.${index}.price`, label: 'Price', required: true },
  {
    name: `${type}.${index}.quantity`,
    label: 'Quantity',
    type: 'number',
    required: true
  }
]

export const GenerateFieldSettings = {
  generalFields,
  clientFields,
  generateArrayFields
}
