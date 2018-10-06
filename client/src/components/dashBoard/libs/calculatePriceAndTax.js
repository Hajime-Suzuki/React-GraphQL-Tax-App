export const currentPeriodIncomeAndTaxDetails = projects => {
  const output = {
    '0': {
      incomes: 0,
      incomesTax: 0,
      expenses: 0,
      expensesTax: 0
    },
    '6': {
      incomes: 0,
      incomesTax: 0,
      expenses: 0,
      expensesTax: 0
    },
    '21': {
      incomes: 0,
      incomesTax: 0,
      expenses: 0,
      expensesTax: 0
    }
  }

  const addTaxAndIncome = (project, type) => {
    project.get(type).forEach(target => {
      const TotalAmount = target.get('price') * target.get('quantity')
      const TotalAomuntTax =
        target.get('price') *
        (target.get('taxRate') !== 0 ? target.get('taxRate') / 100 : 1) *
        target.get('quantity')

      // console.log(target.get('taxRate'))
      output[target.get('taxRate')].incomes += 10
      // console.log(output[target.get('taxRate')])

      output[target.get('taxRate')][type] += TotalAmount
      output[target.get('taxRate')][type + 'Tax'] += TotalAomuntTax
    })
  }

  projects.forEach(project => {
    addTaxAndIncome(project, 'incomes')
    addTaxAndIncome(project, 'expenses')
  })

  // Round
  // Object.entries(output).forEach(([rate, items]) => {
  //   Object.entries(items).forEach(([category, price]) => {
  //     output[rate][category] = Math.round(price * 100) / 100
  //     // output[rate][category] = Math.round(price * 100) / 100
  //   })
  // })
  return output
}
