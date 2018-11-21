import Icon from '@material-ui/core/Icon'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const LoadingIconComponent = styled(Icon)`
  && {
    font-size: ${({ size }: { size: string }) => size || '70px'};
    color: ${theme.palette.secondary.main};
  }
`
export const LoadingIcon = ({ size }: { size: string }) => {
  return <LoadingIconComponent className="fa fa-spinner fa-spin" size={size} />
}
