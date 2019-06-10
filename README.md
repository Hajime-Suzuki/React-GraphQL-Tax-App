# React-GraphQL Tax App

_This project is still in progress._

## Motivation

As a freelancer, it is bit annoying to keep track on all expenses, incomes, who paid or not, and making invoices so forth. An Excel file would be a simple solution, but it doesn't look nice...right? I would like to make an simple yet convenient app for my tax declaration.

---

## Features

Project is the important part of this project, to which you add your incomes and expenses, your client info and your invoice info (such as invoice number or issue date).

- project overview: You can see all projects you have, and overviews of invoice date, how much you get paid and invoice status (invoice sent, payment received).

- project details: You can see and edit details of projects.

- generating invoice: You can generate an PDF file of your project.

---

## Technologies

#### Front end:

~~React + Redux + ImmutableJS.~~  
Now, React (with Typescript) + GraphQL + Apollo Client are used.

#### Back end:

NodeJS (with Typescript) + GraphQL + Apollo server + MongoDB + Koa.

#### Generating PDF:

I use [Pug](https://github.com/pugjs/pug) as template engine and render it on [Puppeteer](https://github.com/GoogleChrome/puppeteer) (headless Chrome browser) and print the PDF file.

#### Typescript and GraphQL:

Since both GraphQL and TS are typed, I feel it's redundant to write GQL schema, and write TS types. So, this awesome [Graphql Code Generator](https://github.com/dotansimha/graphql-code-generator) takes care of generating type definition files! For client side, it generates React-Apollo components as well!  
With this, I feel back-end and front-end are always in sync, since this tool generates typescript types for both side. This is so awesome!

## How To Run:

**server**:
If you have docker, run `docker-compose up` in the server root directly.

If not, make `.env` file in the root directly and set `DB_STRING='mongodb_string_for_your_db'`. Then run `yarn install` to install all dependencies and run `yarn dev`.

**client**:
Run `yarn start` in the client root directly

## Todos:

- use Hooks or MobX for local state management, instead of Apollo Cache.
- rewrite containers with hooks to be able to split logics into smaller pieces.
