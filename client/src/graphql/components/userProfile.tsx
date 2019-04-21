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

export namespace UpdateUser {
  export type Variables = {
    data: UpdateUserInput;
  };

  export type Mutation = {
    __typename?: "Mutation";

    updateUser: UpdateUser;
  };

  export type UpdateUser = {
    __typename?: "UpdateUserResponse";

    message: Maybe<string>;

    user: User;
  };

  export type User = UserFragments.Fragment;
}

export namespace GetUserProfile {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";

    getUser: GetUser;
  };

  export type GetUser = UserFragments.Fragment;
}

export namespace UserFragments {
  export type Fragment = {
    __typename?: "User";

    id: string;

    firstName: string;

    lastName: string;

    clients: Maybe<Clients[]>;

    phone: Maybe<string>;

    btw: Maybe<string>;

    kvk: Maybe<string>;

    iban: Maybe<string>;

    streetAddress: Maybe<string>;

    postalCode: Maybe<string>;

    city: Maybe<string>;
  };

  export type Clients = {
    __typename?: "Client";

    id: string;

    firstName: Maybe<string>;

    lastName: Maybe<string>;

    email: Maybe<string>;

    phone: Maybe<string>;

    streetAddress: Maybe<string>;

    postalCode: Maybe<string>;

    city: Maybe<string>;
  };
}

export namespace ClientFragment {
  export type Fragment = {
    __typename?: "Client";

    id: string;

    firstName: Maybe<string>;

    lastName: Maybe<string>;

    email: Maybe<string>;

    phone: Maybe<string>;
  };
}

export namespace PriceFragment {
  export type Fragment = {
    __typename?: "ExpenseAndIncome";

    price: Maybe<string>;

    quantity: Maybe<number>;

    taxRate: Maybe<number>;
  };
}

export namespace BasicInfoFragment {
  export type Fragment = {
    __typename?: "Project";

    id: string;

    name: string;

    projectDate: Maybe<Date>;

    invoiceDate: Maybe<Date>;

    status: InvoiceStatus;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Fragments
// ====================================================

export namespace UserFragments {
  export const FragmentDoc = gql`
    fragment UserFragments on User {
      id
      firstName
      lastName
      clients {
        id
        firstName
        lastName
        email
        phone
        streetAddress
        postalCode
        city
      }
      phone
      btw
      kvk
      iban
      streetAddress
      postalCode
      city
    }
  `;
}

export namespace ClientFragment {
  export const FragmentDoc = gql`
    fragment ClientFragment on Client {
      id
      firstName
      lastName
      email
      phone
    }
  `;
}

export namespace PriceFragment {
  export const FragmentDoc = gql`
    fragment PriceFragment on ExpenseAndIncome {
      price
      quantity
      taxRate
    }
  `;
}

export namespace BasicInfoFragment {
  export const FragmentDoc = gql`
    fragment BasicInfoFragment on Project {
      id
      name
      projectDate
      invoiceDate
      status
    }
  `;
}

// ====================================================
// Components
// ====================================================

export namespace UpdateUser {
  export const Document = gql`
    mutation updateUser($data: UpdateUserInput!) {
      updateUser(data: $data) {
        message
        user {
          ...UserFragments
        }
      }
    }

    ${UserFragments.FragmentDoc}
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
export namespace GetUserProfile {
  export const Document = gql`
    query getUserProfile {
      getUser {
        ...UserFragments
      }
    }

    ${UserFragments.FragmentDoc}
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
