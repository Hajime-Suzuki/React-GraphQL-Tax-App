import React, { createContext, useState, FC } from 'react'

const useSelectedQuarter = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<Date | number>(
    Date.now()
  )
  const selectQuarter = (date: Date | number) => setSelectedQuarter(date)

  return {
    selectedQuarter,
    selectQuarter
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
