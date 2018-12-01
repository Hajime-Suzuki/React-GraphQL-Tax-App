import Icon from '@material-ui/core/Icon'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

const LoadingIconComponent: any = styled(Icon)`
  && {
    font-size: ${({ size }: any) => size || '70px'};
    color: ${theme.palette.secondary.main};
  }
`
export const LoadingIcon: React.SFC<any> = ({ size }) => {
  return <LoadingIconComponent className="fa fa-spinner fa-spin" size={size} />
}
