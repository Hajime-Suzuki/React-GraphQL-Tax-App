import * as React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import { COLOR } from 'src/styles/constants'
import styled from 'styled-components'

interface Props {
  onClick: () => any
  style: React.CSSProperties
}
const CustomIconButton: any = styled(IconButton)`
  color: ${COLOR.gray.regular};
  .icon {
    font-size: 20px;
  }
`
export const EditIcon: React.SFC<Props> = props => {
  return (
    <CustomIconButton onClick={props.onClick} {...props}>
      <Icon className="fas fa-pen icon" />
    </CustomIconButton>
  )
}
