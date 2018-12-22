import styled from 'styled-components'
import { mainMargin } from './constants'
import { Link } from 'react-router-dom'
import { theme } from './theme'
import { lighten } from 'polished'

const flexContainerProps = `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const AppWrapper = styled.div`
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

const MainWrapper = styled.div`
  ${flexContainerProps}
  width: 90%;
  margin: auto;
  .item {
  }
`

const flexContainer: any = styled.div`
  ${flexContainerProps}
  justify-content: ${({ justify }: any) => justify || 'center'};
  flex-direction: ${({ direction }: any) => direction || 'row'};
  align-items: ${({ alignItems }: any) => alignItems || 'center'};
  width:100%
`

export const Styles = {
  AppWrapper,
  StyledLink,
  flexContainerProps,
  MainWrapper,
  flexContainer
}
