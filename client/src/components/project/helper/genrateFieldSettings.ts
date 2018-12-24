const generalFields = [
  { name: 'invoiceNumber', label: 'Invoice Number' },
  { name: 'projectDate', label: 'Project Date' },
  { name: 'invoiceDate', label: 'Invoice Date' },
  { name: 'name', label: 'Name' }
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
  { name: `${type}.${index}.name`, label: 'Name' },
  { name: `${type}.${index}.price`, label: 'Price' },
  { name: `${type}.${index}.quantity`, label: 'Quantity', type: 'number' }
]

export const GenerateFieldSettings = {
  generalFields,
  clientFields,
  generateArrayFields
}
