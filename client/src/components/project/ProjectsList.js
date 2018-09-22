import { Link } from 'react-router-dom'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import styled from 'styled-components'
import { cardPadding } from '../../styles/constants'
import { theme } from '../../styles/theme'
import Icon from '@material-ui/core/Icon'

const StyledCard = styled(Card)`
  padding: ${cardPadding};
  .icon {
    color: ${theme.palette.secondary.main};
    font-size: 20px;
  }
  .title {
    margin: 0.5em;
  }
`

const Flex = styled.div`
  display: flex;
`

const FlexItemAndIcon = ({ iconClassName, text }) => {
  return (
    <Flex>
      {iconClassName && <Icon className={[iconClassName, 'icon'].join(' ')} />}
      <Typography>{text}</Typography>
    </Flex>
  )
}

const ProjectsList = props => {
  return (
    <Grid container justify="center" spacing={24}>
      {props.projects.map(p => {
        return (
          <Grid key={p.get('id')} item xs={10} md={5} lg={4}>
            <Link to={`/projects/${p.get('id')}`}>
              <StyledCard>
                <Typography variant="display1" className="title">
                  {p.get('name')}
                </Typography>

                <FlexItemAndIcon
                  iconClassName="far fa-calendar-alt"
                  text={p.get('date')}
                />
                <FlexItemAndIcon
                  iconClassName="fas fa-euro-sign"
                  text={p.get('rowPrice')}
                />
                {/* <FlexItemAndIcon
                  iconClassName="fas fa-percent"
                  text={p.get('taxRate')}
                /> */}
                <FlexItemAndIcon text={p.get('status') || 'No action'} />
              </StyledCard>
            </Link>
          </Grid>
          //  </Link>
        )
      })}
    </Grid>
  )
}

export default ProjectsList
