import styled from 'styled-components'
import { mainMargin } from './constants'
import { Link } from 'react-router-dom'
import { theme } from './theme'
import { lighten } from 'polished'
import { Form as FormikForm } from 'formik'

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
  width: 90%;
  max-width: 1200px;
  margin: auto;
`

const flexContainer: any = styled.div`
  ${flexContainerProps}
  justify-content: ${({ justify }: any) => justify || 'center'};
  flex-direction: ${({ direction }: any) => direction || 'row'};
  align-items: ${({ alignItems }: any) => alignItems || 'center'};
  width:100%;
`

const Form: any = styled(FormikForm)`
  ${flexContainerProps}
  .form-section {
    ${flexContainerProps}
    width: 90%;
    max-width: 1000px;
    margin-bottom: 4em;
    .title {
      width: 100%;
      text-align: center;
    }
    .field-item {
      width: 188px;
      margin: 1em;
      &.select {
        display: flex;
        flex-direction: column;
      }
    }
    .add-icon {
      width: 100%;
      text-align: center;
    }
  }
  .message-section {
    text-align: center;
    margin-bottom: 2em;
    width: 100%;
  }
`

export const Styles = {
  AppWrapper,
  StyledLink,
  flexContainerProps,
  MainWrapper,
  flexContainer,
  Form
}
