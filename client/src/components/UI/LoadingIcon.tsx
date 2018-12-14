import Icon from '@material-ui/core/Icon'
import React from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/theme'

interface Props {
  size?: number
}
const LoadingIconComponent: any = styled(Icon)`
  && {
    font-size: ${({ size }: Props) => `${size}px` || '70px'};
    color: ${theme.palette.secondary.main};
  }
`
export const LoadingIcon: React.SFC<Props> = ({ size }) => {
  return <LoadingIconComponent className="fa fa-spinner fa-spin" size={size} />
}
