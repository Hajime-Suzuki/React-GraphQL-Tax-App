export enum InvoiceStatus {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

/** Date Object */
export type Date = any;

// ====================================================
// Documents
// ====================================================

export namespace Login {
  export type Variables = {
    email: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    loginUser: LoginUser;
  };

  export type LoginUser = {
    __typename?: "RegisterResponse";

    token: string;
  };
}

export namespace GetUser {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";

    getUser: GetUser | null;
  };

  export type GetUser = {
    __typename?: "User";

    firstName: string;

    lastName: string;

    email: string;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace Login {
  export const Document = gql`
    mutation login($email: String!, $password: String!) {
      loginUser(email: $email, password: $password) {
        token
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.MutationProps<Mutation, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Mutation<Mutation, Variables>
          mutation={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.MutateProps<Mutation, Variables>
  > &
    TChildProps;
  export type MutationFn = ReactApollo.MutationFn<Mutation, Variables>;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Mutation,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Mutation, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
export namespace GetUser {
  export const Document = gql`
    query getUser($id: String!) {
      getUser(id: $id) {
        firstName
        lastName
        email
      }
    }
  `;
  export class Component extends React.Component<
    Partial<ReactApollo.QueryProps<Query, Variables>>
  > {
    render() {
      return (
        <ReactApollo.Query<Query, Variables>
          query={Document}
          {...(this as any)["props"] as any}
        />
      );
    }
  }
  export type Props<TChildProps = any> = Partial<
    ReactApollo.DataProps<Query, Variables>
  > &
    TChildProps;
  export function HOC<TProps, TChildProps = any>(
    operationOptions:
      | ReactApollo.OperationOption<
          TProps,
          Query,
          Variables,
          Props<TChildProps>
        >
      | undefined
  ) {
    return ReactApollo.graphql<TProps, Query, Variables, Props<TChildProps>>(
      Document,
      operationOptions
    );
  }
}
