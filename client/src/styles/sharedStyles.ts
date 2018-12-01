import styled from 'styled-components'
import { mainMargin } from './constants'
import { Link } from 'react-router-dom'
import { theme } from './theme'
import { lighten } from 'polished'

const MainWrapper = styled.div`
  margin: ${mainMargin} 0;
`

const StyledLink: any = styled(Link)`
  color: ${theme.palette.primary.main};
  font-weight: ${({ weight }: any) => weight};
  transition: 0.3s;
  &:hover {
    color: ${lighten('0.1', theme.palette.primary.main)};
  }
`

export { MainWrapper, StyledLink }
