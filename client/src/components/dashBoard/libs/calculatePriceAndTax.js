import {
  calcTotalvalueWithoutTax,
  calcOnlyTax
} from '../../../libs/singleProject/totalValues'

export const calculateCurrentPeriodRawPrice = projects => {
  return projects.reduce((total, project) => {
    const totalIncome = calcTotalvalueWithoutTax(project.get('incomes'))
    return (total += totalIncome)
  }, 0)
}

export const calculateCurrentPeriodTax = projects => {
  return projects.reduce((total, project) => {
    const totalIncome = calcOnlyTax(project.get('incomes'))
    return (total += totalIncome)
  }, 0)
}
