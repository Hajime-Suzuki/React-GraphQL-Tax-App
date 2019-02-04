import { removeEmptyProperty } from '../../src/helpers/transform'
import { Calculations } from '../../src/helpers/calculation'

describe('======= Helpers =======', () => {
  test('Remove Empty Property', () => {
    const obj = {
      a: '',
      b: undefined,
      c: 'value'
    }
    const newObj = removeEmptyProperty(obj)
    expect(newObj).toEqual({ c: 'value' })
  })

  describe('Calculations', () => {
    const { formatCurrency, getGrandTotal } = Calculations

    test('formats correctly', () => {
      const currency1 = formatCurrency('12.0')
      const currency2 = formatCurrency(90)
      const currency3 = formatCurrency('12.02')
      const currency4 = formatCurrency('09.10')
      const currency5 = formatCurrency(null)
      const currency6 = formatCurrency(NaN)
      expect(currency1).toBe('€12,00')
      expect(currency2).toBe('€90,00')
      expect(currency3).toBe('€12,02')
      expect(currency4).toBe('€9,10')
      expect(currency5).toBe('-')
      expect(currency6).toBe('-')
    })

    describe('Get Grand Total', () => {
      const data = [
        { price: '12', quantity: 2, taxRate: 9 },
        { price: '10', quantity: 2, taxRate: 21 }
      ]
      const data2 = [
        { price: '', quantity: 2, taxRate: 9 },
        { price: '10', quantity: 2, taxRate: 21 }
      ]

      const total = getGrandTotal(data)
      expect(total).toEqual({
        subtotal: '€44,00',
        taxTotal: '€5,64',
        grandTotal: '€49,64'
      })

      const total2 = getGrandTotal(data2)
      expect(total2).toEqual({
        subtotal: '€20,00',
        taxTotal: '€4,20',
        grandTotal: '€24,20'
      })
    })
  })
})
