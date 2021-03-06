import * as React from 'react'
import ClientCard from 'src/view/shared/ClientCard'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'
import styled from 'styled-components'
import { ClientFragmentFragment } from 'src/graphql/components/clients'

const StyledCardWrapper: any = styled.div`
  width: 90%;
  margin-top: 1em;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;

  .card {
    width: 100%;
    max-width: 300px;
    margin: auto;
    text-align: center;
  }
  .remove-button {
    margin-top: 5px;
  }
`
interface Props {
  selectedClient?: ClientFragmentFragment
  unselectClient: () => void
}
const SelectedClientCard: React.FunctionComponent<Props> = ({
  selectedClient,
  unselectClient
}) => {
  if (!selectedClient) return null
  return (
    <StyledCardWrapper>
      <div className="card">
        <ClientCard client={selectedClient} />
        <IconButton onClick={unselectClient} className="remove-button">
          <Icon className="fas fa-minus-circle" />
        </IconButton>
      </div>
    </StyledCardWrapper>
  )
}

export default SelectedClientCard
