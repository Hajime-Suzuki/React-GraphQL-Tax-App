import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import { MutationResult } from 'react-apollo'
import { RouteComponentProps, withRouter } from 'react-router'
import { ClientAction } from 'src/graphql/actions/client'
import {
  AddClientComponent,
  AddClientMutation,
  AddClientMutationFn,
  GetClientsListDocument
} from 'src/graphql/components/clients'
import { ClientInput } from 'src/graphql/components/login'
import { RoutesNames } from 'src/routes/constants'
import AddClientForm from './AddClientForm'
import { clientValidationSchemas } from './helpers/validation'

type AddClient = AddClientMutationFn

interface SubmitValue {
  client: ClientInput
}

export type AddClientFormChildProps = {
  mutationProps: MutationResult<AddClientMutation>
} & FormikProps<SubmitValue>

class AddClientFormContainer extends React.PureComponent<RouteComponentProps> {
  addClient = (addClient: AddClient) => async ({ client }: SubmitValue) => {
    const res = await addClient({ variables: { data: client } })
    if (res && res.data && res.data.addClient && res.data.addClient.client)
      ClientAction.addClient(res.data.addClient.client)
    this.props.history.push(RoutesNames.clientsList)
  }
  render() {
    return (
      <AddClientComponent refetchQueries={[{ query: GetClientsListDocument }]}>
        {(mutation, mutationProps) => (
          <Formik
            initialValues={{ client: {} }}
            onSubmit={this.addClient(mutation)}
            validateOnChange={false}
            validationSchema={clientValidationSchemas.addClientSchema}
            render={(formikProps: FormikProps<SubmitValue>) => (
              <AddClientForm mutationProps={mutationProps} {...formikProps} />
            )}
          />
        )}
      </AddClientComponent>
    )
  }
}

export default withRouter(AddClientFormContainer)
