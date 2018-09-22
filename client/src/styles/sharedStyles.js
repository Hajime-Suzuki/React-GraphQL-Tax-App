import styled from 'styled-components'
import { mainMargin } from './constants'
import { Link } from 'react-router-dom'
import { theme } from './theme'
import { lighten } from 'polished'
const MainWrapper = styled.div`
  margin-top: ${mainMargin};
`

const StyledLink = styled(Link)`
  color: ${theme.palette.primary.main};
  /* font-weight: ${({ bold }) => (bold === true ? 'bold' : 'inherit')}; */
  font-weight: ${({ weight }) => weight};
  transition: 0.3s;
  &:hover {
    color: ${lighten('0.1', theme.palette.primary.main)};
  }
`

export { MainWrapper, StyledLink }
