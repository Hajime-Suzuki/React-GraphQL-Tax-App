export enum InvoiceStatus {
  None = "none",
  Invoice = "invoice",
  Paid = "paid"
}

export type Date = any;

// ====================================================
// Documents
// ====================================================

export namespace GetProjectOverview {
  export type Variables = {
    userId: string;
  };

  export type Query = {
    __typename?: "Query";

    getProjectsByUserId: GetProjectsByUserId[];
  };

  export type GetProjectsByUserId = {
    __typename?: "Project";

    id: string;

    name: string;

    date: Date | null;

    invoiceDate: string | null;

    incomes: Incomes[] | null;

    status: InvoiceStatus;
  };

  export type Incomes = {
    __typename?: "ExpenseAndIncome";

    price: number;

    quantity: number;
  };
}

import * as ReactApollo from "react-apollo";
import * as React from "react";

import gql from "graphql-tag";

// ====================================================
// Components
// ====================================================

export namespace GetProjectOverview {
  export const Document = gql`
    query getProjectOverview($userId: String!) {
      getProjectsByUserId(userId: $userId) {
        id
        name
        date
        invoiceDate
        incomes {
          price
          quantity
        }
        status
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
