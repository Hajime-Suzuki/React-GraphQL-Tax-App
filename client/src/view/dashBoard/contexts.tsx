import React, { createContext, useState, FC } from 'react'
import { getQuarter, subQuarters, addQuarters } from 'date-fns'
import { getYear } from 'date-fns/esm'

const useSelectedQuarter = () => {
  const [selectedDate, setSelectedDate] = useState<Date | number>(new Date())
  const [selectedQuarter, setSelectedQuarter] = useState<number>(
    getQuarter(selectedDate)
  )

  const selectQuarter = (date: Date | number) =>
    setSelectedQuarter(getQuarter(date))

  const previousQuarter = () => {
    setSelectedDate(subQuarters(selectedDate, 1))
    selectQuarter(subQuarters(selectedDate, 1))
  }
  const nextQuarter = () => {
    setSelectedDate(addQuarters(selectedDate, 1))
    selectQuarter(addQuarters(selectedDate, 1))
  }

  return {
    selectedQuarter,
    selectedYear: getYear(selectedDate),
    previousQuarter,
    nextQuarter
  }
}

export const SelectedQuarterContext = createContext({} as ReturnType<
  typeof useSelectedQuarter
>)

export const SelectedQuarterProvider: FC<{}> = ({ children }) => {
  const value = useSelectedQuarter()
  return (
    <SelectedQuarterContext.Provider value={value}>
      {children}
    </SelectedQuarterContext.Provider>
  )
}
