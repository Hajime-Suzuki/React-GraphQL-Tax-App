export type SchemaDef<Type> = { [key in keyof Type]: any }

export type Omit<Type, Keys extends keyof Type> = Pick<
  Type,
  Exclude<keyof Type, Keys>
>
