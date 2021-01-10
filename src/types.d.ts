export interface MyEnumValues {
  a: MyEnum;
  b: MyEnum;
}

export type Pet = {
  name: string,
};

type MyEnum = string & { _: 'MyEnum' }