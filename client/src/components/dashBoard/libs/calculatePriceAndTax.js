export const currentPeriodIncomeAndTaxDetails = projects => {
  const outPut = {
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
        (target.get('taxRate') / 100) *
        target.get('quantity')

      outPut[target.get('taxRate')][type] += Math.round(TotalAmount * 100) / 100
      outPut[target.get('taxRate')][type + 'Tax'] +=
        Math.round(TotalAomuntTax * 100) / 100
    })
  }

  projects.forEach(project => {
    addTaxAndIncome(project, 'incomes')
    addTaxAndIncome(project, 'expenses')
  })

  return outPut
}
