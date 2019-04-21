export type Maybe<T> = T | null;

export interface UpdateUserInput {
  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<string>;

  password?: Maybe<string>;

  btw?: Maybe<string>;

  kvk?: Maybe<string>;

  iban?: Maybe<string>;

  streetAddress?: Maybe<string>;

  postalCode?: Maybe<string>;

  city?: Maybe<string>;
}

export interface ProjectInput {
  invoiceNumber?: Maybe<string>;

  invoiceDate?: Maybe<string>;

  projectDate?: Maybe<string>;

  name?: Maybe<string>;

  date?: Maybe<string>;

  status?: Maybe<InvoiceStatus>;

  client?: Maybe<ClientInput>;

  expenses?: Maybe<ExpenseAndIncomeInput[]>;

  incomes?: Maybe<ExpenseAndIncomeInput[]>;
}

export interface ClientInput {
  id?: Maybe<string>;

  firstName?: Maybe<string>;

  lastName?: Maybe<string>;

  email?: Maybe<string>;

  phone?: Maybe<string>;

  streetAddress?: Maybe<string>;

  postalCode?: Maybe<string>;

  city?: Maybe<string>;
}

export interface ExpenseAndIncomeInput {
  name?: Maybe<string>;

  price?: Maybe<string>;

  quantity?: Maybe<number>;

  taxRate?: Maybe<number>;
}

export interface GeneralExpenseInput {
  name: string;

  price: string;

  quantity: number;

  taxRate: number;

  date: string;
}

export enum InvoiceStatus {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

export type Date = any;

export type Blob = any;

// ====================================================
// Documents
// ====================================================

export namespace SignUp {
  export type Variables = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  };

  export type Mutation = {
    __typename?: "Mutation";

    registerUser: RegisterUser;
  };

  export type RegisterUser = {
    __typename?: "RegisterResponse";

    token: string;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace SignUp {
  export const Document = gql`
    mutation signUp(
      $firstName: String!
      $lastName: String!
      $email: String!
      $password: String!
    ) {
      registerUser(
        firstName: $firstName
        lastName: $lastName
        email: $email
        password: $password
      ) {
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
