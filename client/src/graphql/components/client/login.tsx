import gql from "graphql-tag";
import * as React from "react";
import * as ReactApollo from "react-apollo";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Project = {
  __typename?: "Project";
  id: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  token: Scalars["String"];
  userId?: Maybe<Scalars["String"]>;
};
export type GetTokenQueryVariables = {};

export type GetTokenQuery = { __typename?: "Query" } & Pick<Query, "userId">;

export const GetTokenDocument = gql`
  query getToken {
    userId @client
  }
`;
export type GetTokenComponentProps = Omit<
  Omit<ReactApollo.QueryProps<GetTokenQuery, GetTokenQueryVariables>, "query">,
  "variables"
> & { variables?: GetTokenQueryVariables };

export const GetTokenComponent = (props: GetTokenComponentProps) => (
  <ReactApollo.Query<GetTokenQuery, GetTokenQueryVariables>
    query={GetTokenDocument}
    {...props}
  />
);

export type GetTokenProps<TChildProps = {}> = Partial<
  ReactApollo.DataProps<GetTokenQuery, GetTokenQueryVariables>
> &
  TChildProps;
export function withGetToken<TProps, TChildProps = {}>(
  operationOptions?: ReactApollo.OperationOption<
    TProps,
    GetTokenQuery,
    GetTokenQueryVariables,
    GetTokenProps<TChildProps>
  >
) {
  return ReactApollo.withQuery<
    TProps,
    GetTokenQuery,
    GetTokenQueryVariables,
    GetTokenProps<TChildProps>
  >(GetTokenDocument, {
    alias: "withGetToken",
    ...operationOptions
  });
}
