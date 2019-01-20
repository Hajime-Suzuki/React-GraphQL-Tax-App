import * as React from 'react'
import { ClientInput } from 'src/graphql/components/login'
import { AddClient, GetClientsList } from 'src/graphql/components/clients'
import { Formik, FormikProps } from 'formik'
import { MutationFn, MutationResult } from 'react-apollo'
import AddClientForm from './AddClientForm'

type AddClient = MutationFn<AddClient.Mutation, AddClient.Variables>

interface SubmitValue {
  client: ClientInput
}

export type AddClientFormChildProps = {
  mutationProps: MutationResult<AddClient.Mutation>;
} & FormikProps<SubmitValue>

class AddClientFormContainer extends React.PureComponent {
  addClient = (addClient: AddClient) => async ({ client }: SubmitValue) => {
    console.log(client)
    await addClient({ variables: { data: client } })
    console.log('asht')
  }
  render() {
    return (
      <AddClient.Component>
        {(mutation, mutationProps) => (
          <Formik
            initialValues={{ client: {} }}
            onSubmit={this.addClient(mutation)}
            validateOnChange={false}
            render={(formikProps: FormikProps<SubmitValue>) => (
              <AddClientForm mutationProps={mutationProps} {...formikProps} />
            )}
          />
        )}
      </AddClient.Component>
    )
  }
}

export default AddClientFormContainer
