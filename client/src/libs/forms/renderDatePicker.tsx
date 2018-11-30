import React from 'react'
import DatePicker from 'material-ui-pickers/DatePicker'

export const renderDatePicker = ({ input, ...other }) => {
  return (
    <DatePicker
      // label="Basic example"
      // value={selectedDate}
      {...input}
      {...other}
      // animateYearScrolling
    />
  )
}
