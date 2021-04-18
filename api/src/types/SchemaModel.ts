import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `ID` scalar type represents a unique MongoDB identifier in collection. MongoDB by default use 12-byte ObjectId value (https://docs.mongodb.com/manual/reference/bson-types/#objectid). But MongoDB also may accepts string or integer as correct values for _id field. */
  MongoID: any;
  /** The string representation of JavaScript regexp. You may provide it with flags "/^abc.*\/i" or without flags like "^abc.*". More info about RegExp characters and flags: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions */
  RegExpAsString: any;
};









export type Admin = UserInterface & {
  __typename?: 'Admin';
  _id: Scalars['MongoID'];
  role?: Maybe<EnumDKeyUserRole>;
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type CreateOneAdminInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type CreateOneAdminPayload = {
  __typename?: 'CreateOneAdminPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Admin>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneCustomerInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  billingAddress: Scalars['String'];
  shippingAddress: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  orderIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateOneCustomerPayload = {
  __typename?: 'CreateOneCustomerPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Customer>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneOrderInput = {
  status: EnumOrderStatus;
  timestamp?: Maybe<Scalars['Date']>;
  customerId: Scalars['String'];
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type CreateOneOrderPayload = {
  __typename?: 'CreateOneOrderPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Order>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOneProductInput = {
  sku: Scalars['String'];
  name: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  stock: Scalars['Float'];
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
};

export type CreateOneProductPayload = {
  __typename?: 'CreateOneProductPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Product>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type CreateOnePromotionInput = {
  sku: Scalars['String'];
  name: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  stock: Scalars['Float'];
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
  discountPercentage: Scalars['Float'];
};

export type CreateOnePromotionPayload = {
  __typename?: 'CreateOnePromotionPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Created document */
  record?: Maybe<Promotion>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type Customer = UserInterface & {
  __typename?: 'Customer';
  _id: Scalars['MongoID'];
  role?: Maybe<EnumDKeyUserRole>;
  username: Scalars['String'];
  email: Scalars['String'];
  billingAddress: Scalars['String'];
  shippingAddress: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  orderIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  password: Scalars['String'];
  orders: Array<Order>;
};


export type CustomerOrdersArgs = {
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyOrderInput>;
};


export enum EnumDKeyProductsType {
  Product = 'Product',
  Promotion = 'Promotion'
}

export enum EnumDKeyUserRole {
  Admin = 'Admin',
  Customer = 'Customer'
}

export enum EnumOrderStatus {
  AwaitingPayment = 'AWAITING_PAYMENT',
  Paid = 'PAID',
  Shipped = 'SHIPPED',
  Completed = 'COMPLETED'
}

export type ErrorInterface = {
  /** Generic error message */
  message?: Maybe<Scalars['String']>;
};

export type FilterFindManyAdminInput = {
  _id?: Maybe<Scalars['MongoID']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyUserOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyUserInput>>;
  AND?: Maybe<Array<FilterFindManyUserInput>>;
};

export type FilterFindManyCustomerInput = {
  _id?: Maybe<Scalars['MongoID']>;
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  orderIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyUserOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyUserInput>>;
  AND?: Maybe<Array<FilterFindManyUserInput>>;
};

export type FilterFindManyOrderInput = {
  status?: Maybe<EnumOrderStatus>;
  timestamp?: Maybe<Scalars['Date']>;
  customerId?: Maybe<Scalars['String']>;
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyOrderOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyOrderInput>>;
  AND?: Maybe<Array<FilterFindManyOrderInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyOrderOperatorsInput = {
  _id?: Maybe<FilterFindManyOrder_IdOperatorsInput>;
};

export type FilterFindManyOrder_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyProductInput = {
  _id?: Maybe<Scalars['MongoID']>;
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyProductsOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyProductsInput>>;
  AND?: Maybe<Array<FilterFindManyProductsInput>>;
};

export type FilterFindManyProductsInput = {
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  type?: Maybe<EnumDKeyProductsType>;
  image?: Maybe<Scalars['String']>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyProductsOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyProductsInput>>;
  AND?: Maybe<Array<FilterFindManyProductsInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyProductsOperatorsInput = {
  sku?: Maybe<FilterFindManyProductsSkuOperatorsInput>;
  _id?: Maybe<FilterFindManyProducts_IdOperatorsInput>;
};

export type FilterFindManyProductsSkuOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyProducts_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyPromotionInput = {
  _id?: Maybe<Scalars['MongoID']>;
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
  discountPercentage?: Maybe<Scalars['Float']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyProductsOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyProductsInput>>;
  AND?: Maybe<Array<FilterFindManyProductsInput>>;
};

export type FilterFindManyUserEmailOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyUserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<EnumDKeyUserRole>;
  _id?: Maybe<Scalars['MongoID']>;
  /** List of *indexed* fields that can be filtered via operators. */
  _operators?: Maybe<FilterFindManyUserOperatorsInput>;
  OR?: Maybe<Array<FilterFindManyUserInput>>;
  AND?: Maybe<Array<FilterFindManyUserInput>>;
};

/** For performance reason this type contains only *indexed* fields. */
export type FilterFindManyUserOperatorsInput = {
  username?: Maybe<FilterFindManyUserUsernameOperatorsInput>;
  email?: Maybe<FilterFindManyUserEmailOperatorsInput>;
  _id?: Maybe<FilterFindManyUser_IdOperatorsInput>;
};

export type FilterFindManyUserUsernameOperatorsInput = {
  gt?: Maybe<Scalars['String']>;
  gte?: Maybe<Scalars['String']>;
  lt?: Maybe<Scalars['String']>;
  lte?: Maybe<Scalars['String']>;
  ne?: Maybe<Scalars['String']>;
  in?: Maybe<Array<Maybe<Scalars['String']>>>;
  nin?: Maybe<Array<Maybe<Scalars['String']>>>;
  regex?: Maybe<Scalars['RegExpAsString']>;
  exists?: Maybe<Scalars['Boolean']>;
};

export type FilterFindManyUser_IdOperatorsInput = {
  gt?: Maybe<Scalars['MongoID']>;
  gte?: Maybe<Scalars['MongoID']>;
  lt?: Maybe<Scalars['MongoID']>;
  lte?: Maybe<Scalars['MongoID']>;
  ne?: Maybe<Scalars['MongoID']>;
  in?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  nin?: Maybe<Array<Maybe<Scalars['MongoID']>>>;
  exists?: Maybe<Scalars['Boolean']>;
};


export type LoginPayload = {
  __typename?: 'LoginPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type MongoError = ErrorInterface & {
  __typename?: 'MongoError';
  /** MongoDB error message */
  message?: Maybe<Scalars['String']>;
  /** MongoDB error code */
  code?: Maybe<Scalars['Int']>;
};


export type Mutation = {
  __typename?: 'Mutation';
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createProduct?: Maybe<CreateOneProductPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createPromotion?: Maybe<CreateOnePromotionPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateProductById?: Maybe<UpdateByIdProductPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updatePromotionById?: Maybe<UpdateByIdPromotionPayload>;
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  removeProductById?: Maybe<RemoveByIdProductPayload>;
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  removePromotionById?: Maybe<RemoveByIdPromotionPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createAdmin?: Maybe<CreateOneAdminPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createCustomer?: Maybe<CreateOneCustomerPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateUserById?: Maybe<UpdateByIdUserPayload>;
  /** Remove one document: 1) Retrieve one document and remove with hooks via findByIdAndRemove. 2) Return removed document. */
  removeUserById?: Maybe<RemoveByIdUserPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateCustomerById?: Maybe<UpdateByIdCustomerPayload>;
  /** Create one document with mongoose defaults, setters, hooks and validation */
  createOrder?: Maybe<CreateOneOrderPayload>;
  /** Update one document: 1) Retrieve one document by findById. 2) Apply updates to mongoose document. 3) Mongoose applies defaults, setters, hooks and validation. 4) And save it. */
  updateOrderById?: Maybe<UpdateByIdOrderPayload>;
  login?: Maybe<LoginPayload>;
};


export type MutationCreateProductArgs = {
  record: CreateOneProductInput;
};


export type MutationCreatePromotionArgs = {
  record: CreateOnePromotionInput;
};


export type MutationUpdateProductByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdProductInput;
};


export type MutationUpdatePromotionByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdPromotionInput;
};


export type MutationRemoveProductByIdArgs = {
  _id: Scalars['MongoID'];
};


export type MutationRemovePromotionByIdArgs = {
  _id: Scalars['MongoID'];
};


export type MutationCreateAdminArgs = {
  record: CreateOneAdminInput;
};


export type MutationCreateCustomerArgs = {
  record: CreateOneCustomerInput;
};


export type MutationUpdateUserByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdUserInput;
};


export type MutationRemoveUserByIdArgs = {
  _id: Scalars['MongoID'];
};


export type MutationUpdateCustomerByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdCustomerInput;
};


export type MutationCreateOrderArgs = {
  record: CreateOneOrderInput;
};


export type MutationUpdateOrderByIdArgs = {
  _id: Scalars['MongoID'];
  record: UpdateByIdOrderInput;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type Order = {
  __typename?: 'Order';
  status: EnumOrderStatus;
  timestamp?: Maybe<Scalars['Date']>;
  customerId: Scalars['String'];
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  _id: Scalars['MongoID'];
  orderedBy?: Maybe<Customer>;
  products: Array<Product>;
};


export type OrderProductsArgs = {
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindByIdsProductInput>;
};

export type Product = ProductsInterface & {
  __typename?: 'Product';
  _id: Scalars['MongoID'];
  type?: Maybe<EnumDKeyProductsType>;
  sku: Scalars['String'];
  name: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  stock: Scalars['Float'];
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
};

export type Products = ProductsInterface & {
  __typename?: 'Products';
  _id: Scalars['MongoID'];
  type?: Maybe<EnumDKeyProductsType>;
  sku: Scalars['String'];
  name: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  stock: Scalars['Float'];
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
};

export type ProductsInterface = {
  _id: Scalars['MongoID'];
  type?: Maybe<EnumDKeyProductsType>;
  sku: Scalars['String'];
  name: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  stock: Scalars['Float'];
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
};

export type Promotion = ProductsInterface & {
  __typename?: 'Promotion';
  _id: Scalars['MongoID'];
  type?: Maybe<EnumDKeyProductsType>;
  sku: Scalars['String'];
  name: Scalars['String'];
  detail?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  weight?: Maybe<Scalars['Float']>;
  stock: Scalars['Float'];
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
  discountPercentage: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
  productById?: Maybe<Product>;
  promotions: Array<Promotion>;
  promotionById?: Maybe<Promotion>;
  users?: Maybe<Array<Maybe<UserInterface>>>;
  userById?: Maybe<UserInterface>;
  admins: Array<Admin>;
  adminById?: Maybe<Admin>;
  customers: Array<Customer>;
  customerById?: Maybe<Customer>;
  me?: Maybe<User>;
  orders: Array<Order>;
  orderById?: Maybe<Order>;
};


export type QueryProductsArgs = {
  filter?: Maybe<FilterFindManyProductInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyProductInput>;
};


export type QueryProductByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryPromotionsArgs = {
  filter?: Maybe<FilterFindManyPromotionInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyPromotionInput>;
};


export type QueryPromotionByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryUsersArgs = {
  filter?: Maybe<FilterFindManyUserInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyUserInput>;
};


export type QueryUserByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryAdminsArgs = {
  filter?: Maybe<FilterFindManyAdminInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyAdminInput>;
};


export type QueryAdminByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryCustomersArgs = {
  filter?: Maybe<FilterFindManyCustomerInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyCustomerInput>;
};


export type QueryCustomerByIdArgs = {
  _id: Scalars['MongoID'];
};


export type QueryOrdersArgs = {
  filter?: Maybe<FilterFindManyOrderInput>;
  skip?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
  sort?: Maybe<SortFindManyOrderInput>;
};


export type QueryOrderByIdArgs = {
  _id: Scalars['MongoID'];
};


export type RemoveByIdProductPayload = {
  __typename?: 'RemoveByIdProductPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Removed document */
  record?: Maybe<Product>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type RemoveByIdPromotionPayload = {
  __typename?: 'RemoveByIdPromotionPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Removed document */
  record?: Maybe<Promotion>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type RemoveByIdUserPayload = {
  __typename?: 'RemoveByIdUserPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Removed document */
  record?: Maybe<UserInterface>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type RuntimeError = ErrorInterface & {
  __typename?: 'RuntimeError';
  /** Runtime error message */
  message?: Maybe<Scalars['String']>;
};

export enum SortFindByIdsProductInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SkuAsc = 'SKU_ASC',
  SkuDesc = 'SKU_DESC'
}

export enum SortFindManyAdminInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC'
}

export enum SortFindManyCustomerInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC'
}

export enum SortFindManyOrderInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC'
}

export enum SortFindManyProductInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SkuAsc = 'SKU_ASC',
  SkuDesc = 'SKU_DESC'
}

export enum SortFindManyPromotionInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  SkuAsc = 'SKU_ASC',
  SkuDesc = 'SKU_DESC'
}

export enum SortFindManyUserInput {
  IdAsc = '_ID_ASC',
  IdDesc = '_ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  EmailAsc = 'EMAIL_ASC',
  EmailDesc = 'EMAIL_DESC'
}

export type UpdateByIdCustomerInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  billingAddress?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  orderIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateByIdCustomerPayload = {
  __typename?: 'UpdateByIdCustomerPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Customer>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdOrderInput = {
  status?: Maybe<EnumOrderStatus>;
  timestamp?: Maybe<Scalars['Date']>;
  customerId?: Maybe<Scalars['String']>;
  productIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type UpdateByIdOrderPayload = {
  __typename?: 'UpdateByIdOrderPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Order>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdProductInput = {
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
};

export type UpdateByIdProductPayload = {
  __typename?: 'UpdateByIdProductPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Product>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdPromotionInput = {
  sku?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  detail?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  weight?: Maybe<Scalars['Float']>;
  stock?: Maybe<Scalars['Float']>;
  created?: Maybe<Scalars['Date']>;
  modified?: Maybe<Scalars['Date']>;
  image?: Maybe<Scalars['String']>;
  discountPercentage?: Maybe<Scalars['Float']>;
};

export type UpdateByIdPromotionPayload = {
  __typename?: 'UpdateByIdPromotionPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<Promotion>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type UpdateByIdUserInput = {
  username?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  role?: Maybe<EnumDKeyUserRole>;
};

export type UpdateByIdUserPayload = {
  __typename?: 'UpdateByIdUserPayload';
  /** Document ID */
  recordId?: Maybe<Scalars['MongoID']>;
  /** Updated document */
  record?: Maybe<UserInterface>;
  /** Error that may occur during operation. If you request this field in GraphQL query, you will receive typed error in payload; otherwise error will be provided in root `errors` field of GraphQL response. */
  error?: Maybe<ErrorInterface>;
};

export type User = UserInterface & {
  __typename?: 'User';
  _id: Scalars['MongoID'];
  role?: Maybe<EnumDKeyUserRole>;
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserInterface = {
  _id: Scalars['MongoID'];
  role?: Maybe<EnumDKeyUserRole>;
  username: Scalars['String'];
  email: Scalars['String'];
};

export type ValidationError = ErrorInterface & {
  __typename?: 'ValidationError';
  /** Combined error message from all validators */
  message?: Maybe<Scalars['String']>;
  /** List of validator errors */
  errors?: Maybe<Array<ValidatorError>>;
};

export type ValidatorError = {
  __typename?: 'ValidatorError';
  /** Validation error message */
  message?: Maybe<Scalars['String']>;
  /** Source of the validation error from the model path */
  path?: Maybe<Scalars['String']>;
  /** Field value which occurs the validation error */
  value?: Maybe<Scalars['JSON']>;
  /** Input record idx in array which occurs the validation error. This `idx` is useful for createMany operation. For singular operations it always be 0. For *Many operations `idx` represents record index in array received from user. */
  idx: Scalars['Int'];
};

export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Admin: ResolverTypeWrapper<Admin>;
  String: ResolverTypeWrapper<Scalars['String']>;
  CreateOneAdminInput: CreateOneAdminInput;
  CreateOneAdminPayload: ResolverTypeWrapper<CreateOneAdminPayload>;
  CreateOneCustomerInput: CreateOneCustomerInput;
  CreateOneCustomerPayload: ResolverTypeWrapper<CreateOneCustomerPayload>;
  CreateOneOrderInput: CreateOneOrderInput;
  CreateOneOrderPayload: ResolverTypeWrapper<CreateOneOrderPayload>;
  CreateOneProductInput: CreateOneProductInput;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  CreateOneProductPayload: ResolverTypeWrapper<CreateOneProductPayload>;
  CreateOnePromotionInput: CreateOnePromotionInput;
  CreateOnePromotionPayload: ResolverTypeWrapper<CreateOnePromotionPayload>;
  Customer: ResolverTypeWrapper<Customer>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  EnumDKeyProductsType: EnumDKeyProductsType;
  EnumDKeyUserRole: EnumDKeyUserRole;
  EnumOrderStatus: EnumOrderStatus;
  ErrorInterface: ResolversTypes['MongoError'] | ResolversTypes['RuntimeError'] | ResolversTypes['ValidationError'];
  FilterFindManyAdminInput: FilterFindManyAdminInput;
  FilterFindManyCustomerInput: FilterFindManyCustomerInput;
  FilterFindManyOrderInput: FilterFindManyOrderInput;
  FilterFindManyOrderOperatorsInput: FilterFindManyOrderOperatorsInput;
  FilterFindManyOrder_idOperatorsInput: FilterFindManyOrder_IdOperatorsInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  FilterFindManyProductInput: FilterFindManyProductInput;
  FilterFindManyProductsInput: FilterFindManyProductsInput;
  FilterFindManyProductsOperatorsInput: FilterFindManyProductsOperatorsInput;
  FilterFindManyProductsSkuOperatorsInput: FilterFindManyProductsSkuOperatorsInput;
  FilterFindManyProducts_idOperatorsInput: FilterFindManyProducts_IdOperatorsInput;
  FilterFindManyPromotionInput: FilterFindManyPromotionInput;
  FilterFindManyUserEmailOperatorsInput: FilterFindManyUserEmailOperatorsInput;
  FilterFindManyUserInput: FilterFindManyUserInput;
  FilterFindManyUserOperatorsInput: FilterFindManyUserOperatorsInput;
  FilterFindManyUserUsernameOperatorsInput: FilterFindManyUserUsernameOperatorsInput;
  FilterFindManyUser_idOperatorsInput: FilterFindManyUser_IdOperatorsInput;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  LoginPayload: ResolverTypeWrapper<LoginPayload>;
  MongoError: ResolverTypeWrapper<MongoError>;
  MongoID: ResolverTypeWrapper<Scalars['MongoID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Order: ResolverTypeWrapper<Order>;
  Product: ResolverTypeWrapper<Product>;
  Products: ResolverTypeWrapper<Products>;
  ProductsInterface: ResolversTypes['Product'] | ResolversTypes['Products'] | ResolversTypes['Promotion'];
  Promotion: ResolverTypeWrapper<Promotion>;
  Query: ResolverTypeWrapper<{}>;
  RegExpAsString: ResolverTypeWrapper<Scalars['RegExpAsString']>;
  RemoveByIdProductPayload: ResolverTypeWrapper<RemoveByIdProductPayload>;
  RemoveByIdPromotionPayload: ResolverTypeWrapper<RemoveByIdPromotionPayload>;
  RemoveByIdUserPayload: ResolverTypeWrapper<RemoveByIdUserPayload>;
  RuntimeError: ResolverTypeWrapper<RuntimeError>;
  SortFindByIdsProductInput: SortFindByIdsProductInput;
  SortFindManyAdminInput: SortFindManyAdminInput;
  SortFindManyCustomerInput: SortFindManyCustomerInput;
  SortFindManyOrderInput: SortFindManyOrderInput;
  SortFindManyProductInput: SortFindManyProductInput;
  SortFindManyPromotionInput: SortFindManyPromotionInput;
  SortFindManyUserInput: SortFindManyUserInput;
  UpdateByIdCustomerInput: UpdateByIdCustomerInput;
  UpdateByIdCustomerPayload: ResolverTypeWrapper<UpdateByIdCustomerPayload>;
  UpdateByIdOrderInput: UpdateByIdOrderInput;
  UpdateByIdOrderPayload: ResolverTypeWrapper<UpdateByIdOrderPayload>;
  UpdateByIdProductInput: UpdateByIdProductInput;
  UpdateByIdProductPayload: ResolverTypeWrapper<UpdateByIdProductPayload>;
  UpdateByIdPromotionInput: UpdateByIdPromotionInput;
  UpdateByIdPromotionPayload: ResolverTypeWrapper<UpdateByIdPromotionPayload>;
  UpdateByIdUserInput: UpdateByIdUserInput;
  UpdateByIdUserPayload: ResolverTypeWrapper<UpdateByIdUserPayload>;
  User: ResolverTypeWrapper<User>;
  UserInterface: ResolversTypes['Admin'] | ResolversTypes['Customer'] | ResolversTypes['User'];
  ValidationError: ResolverTypeWrapper<ValidationError>;
  ValidatorError: ResolverTypeWrapper<ValidatorError>;
  AdditionalEntityFields: AdditionalEntityFields;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Admin: Admin;
  String: Scalars['String'];
  CreateOneAdminInput: CreateOneAdminInput;
  CreateOneAdminPayload: CreateOneAdminPayload;
  CreateOneCustomerInput: CreateOneCustomerInput;
  CreateOneCustomerPayload: CreateOneCustomerPayload;
  CreateOneOrderInput: CreateOneOrderInput;
  CreateOneOrderPayload: CreateOneOrderPayload;
  CreateOneProductInput: CreateOneProductInput;
  Float: Scalars['Float'];
  CreateOneProductPayload: CreateOneProductPayload;
  CreateOnePromotionInput: CreateOnePromotionInput;
  CreateOnePromotionPayload: CreateOnePromotionPayload;
  Customer: Customer;
  Int: Scalars['Int'];
  Date: Scalars['Date'];
  ErrorInterface: ResolversParentTypes['MongoError'] | ResolversParentTypes['RuntimeError'] | ResolversParentTypes['ValidationError'];
  FilterFindManyAdminInput: FilterFindManyAdminInput;
  FilterFindManyCustomerInput: FilterFindManyCustomerInput;
  FilterFindManyOrderInput: FilterFindManyOrderInput;
  FilterFindManyOrderOperatorsInput: FilterFindManyOrderOperatorsInput;
  FilterFindManyOrder_idOperatorsInput: FilterFindManyOrder_IdOperatorsInput;
  Boolean: Scalars['Boolean'];
  FilterFindManyProductInput: FilterFindManyProductInput;
  FilterFindManyProductsInput: FilterFindManyProductsInput;
  FilterFindManyProductsOperatorsInput: FilterFindManyProductsOperatorsInput;
  FilterFindManyProductsSkuOperatorsInput: FilterFindManyProductsSkuOperatorsInput;
  FilterFindManyProducts_idOperatorsInput: FilterFindManyProducts_IdOperatorsInput;
  FilterFindManyPromotionInput: FilterFindManyPromotionInput;
  FilterFindManyUserEmailOperatorsInput: FilterFindManyUserEmailOperatorsInput;
  FilterFindManyUserInput: FilterFindManyUserInput;
  FilterFindManyUserOperatorsInput: FilterFindManyUserOperatorsInput;
  FilterFindManyUserUsernameOperatorsInput: FilterFindManyUserUsernameOperatorsInput;
  FilterFindManyUser_idOperatorsInput: FilterFindManyUser_IdOperatorsInput;
  JSON: Scalars['JSON'];
  LoginPayload: LoginPayload;
  MongoError: MongoError;
  MongoID: Scalars['MongoID'];
  Mutation: {};
  Order: Order;
  Product: Product;
  Products: Products;
  ProductsInterface: ResolversParentTypes['Product'] | ResolversParentTypes['Products'] | ResolversParentTypes['Promotion'];
  Promotion: Promotion;
  Query: {};
  RegExpAsString: Scalars['RegExpAsString'];
  RemoveByIdProductPayload: RemoveByIdProductPayload;
  RemoveByIdPromotionPayload: RemoveByIdPromotionPayload;
  RemoveByIdUserPayload: RemoveByIdUserPayload;
  RuntimeError: RuntimeError;
  UpdateByIdCustomerInput: UpdateByIdCustomerInput;
  UpdateByIdCustomerPayload: UpdateByIdCustomerPayload;
  UpdateByIdOrderInput: UpdateByIdOrderInput;
  UpdateByIdOrderPayload: UpdateByIdOrderPayload;
  UpdateByIdProductInput: UpdateByIdProductInput;
  UpdateByIdProductPayload: UpdateByIdProductPayload;
  UpdateByIdPromotionInput: UpdateByIdPromotionInput;
  UpdateByIdPromotionPayload: UpdateByIdPromotionPayload;
  UpdateByIdUserInput: UpdateByIdUserInput;
  UpdateByIdUserPayload: UpdateByIdUserPayload;
  User: User;
  UserInterface: ResolversParentTypes['Admin'] | ResolversParentTypes['Customer'] | ResolversParentTypes['User'];
  ValidationError: ValidationError;
  ValidatorError: ValidatorError;
  AdditionalEntityFields: AdditionalEntityFields;
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'];
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>;
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>>; };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']>; };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String']; };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AdminResolvers<ContextType = any, ParentType extends ResolversParentTypes['Admin'] = ResolversParentTypes['Admin']> = {
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['EnumDKeyUserRole']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOneAdminPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOneAdminPayload'] = ResolversParentTypes['CreateOneAdminPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Admin']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOneCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOneCustomerPayload'] = ResolversParentTypes['CreateOneCustomerPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOneOrderPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOneOrderPayload'] = ResolversParentTypes['CreateOneOrderPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOneProductPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOneProductPayload'] = ResolversParentTypes['CreateOneProductPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOnePromotionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOnePromotionPayload'] = ResolversParentTypes['CreateOnePromotionPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Promotion']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['EnumDKeyUserRole']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  billingAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingAddress?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<CustomerOrdersArgs, 'limit'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ErrorInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorInterface'] = ResolversParentTypes['ErrorInterface']> = {
  __resolveType: TypeResolveFn<'MongoError' | 'RuntimeError' | 'ValidationError', ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LoginPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginPayload'] = ResolversParentTypes['LoginPayload']> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MongoErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['MongoError'] = ResolversParentTypes['MongoError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface MongoIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['MongoID'], any> {
  name: 'MongoID';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProduct?: Resolver<Maybe<ResolversTypes['CreateOneProductPayload']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'record'>>;
  createPromotion?: Resolver<Maybe<ResolversTypes['CreateOnePromotionPayload']>, ParentType, ContextType, RequireFields<MutationCreatePromotionArgs, 'record'>>;
  updateProductById?: Resolver<Maybe<ResolversTypes['UpdateByIdProductPayload']>, ParentType, ContextType, RequireFields<MutationUpdateProductByIdArgs, '_id' | 'record'>>;
  updatePromotionById?: Resolver<Maybe<ResolversTypes['UpdateByIdPromotionPayload']>, ParentType, ContextType, RequireFields<MutationUpdatePromotionByIdArgs, '_id' | 'record'>>;
  removeProductById?: Resolver<Maybe<ResolversTypes['RemoveByIdProductPayload']>, ParentType, ContextType, RequireFields<MutationRemoveProductByIdArgs, '_id'>>;
  removePromotionById?: Resolver<Maybe<ResolversTypes['RemoveByIdPromotionPayload']>, ParentType, ContextType, RequireFields<MutationRemovePromotionByIdArgs, '_id'>>;
  createAdmin?: Resolver<Maybe<ResolversTypes['CreateOneAdminPayload']>, ParentType, ContextType, RequireFields<MutationCreateAdminArgs, 'record'>>;
  createCustomer?: Resolver<Maybe<ResolversTypes['CreateOneCustomerPayload']>, ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'record'>>;
  updateUserById?: Resolver<Maybe<ResolversTypes['UpdateByIdUserPayload']>, ParentType, ContextType, RequireFields<MutationUpdateUserByIdArgs, '_id' | 'record'>>;
  removeUserById?: Resolver<Maybe<ResolversTypes['RemoveByIdUserPayload']>, ParentType, ContextType, RequireFields<MutationRemoveUserByIdArgs, '_id'>>;
  updateCustomerById?: Resolver<Maybe<ResolversTypes['UpdateByIdCustomerPayload']>, ParentType, ContextType, RequireFields<MutationUpdateCustomerByIdArgs, '_id' | 'record'>>;
  createOrder?: Resolver<Maybe<ResolversTypes['CreateOneOrderPayload']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'record'>>;
  updateOrderById?: Resolver<Maybe<ResolversTypes['UpdateByIdOrderPayload']>, ParentType, ContextType, RequireFields<MutationUpdateOrderByIdArgs, '_id' | 'record'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginPayload']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'username' | 'password'>>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  status?: Resolver<ResolversTypes['EnumOrderStatus'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productIds?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  orderedBy?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<OrderProductsArgs, 'limit'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EnumDKeyProductsType']>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['Products'] = ResolversParentTypes['Products']> = {
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EnumDKeyProductsType']>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsInterface'] = ResolversParentTypes['ProductsInterface']> = {
  __resolveType: TypeResolveFn<'Product' | 'Products' | 'Promotion', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EnumDKeyProductsType']>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type PromotionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Promotion'] = ResolversParentTypes['Promotion']> = {
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['EnumDKeyProductsType']>, ParentType, ContextType>;
  sku?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  detail?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  created?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  modified?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discountPercentage?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  products?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductsArgs, 'limit'>>;
  productById?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryProductByIdArgs, '_id'>>;
  promotions?: Resolver<Array<ResolversTypes['Promotion']>, ParentType, ContextType, RequireFields<QueryPromotionsArgs, 'limit'>>;
  promotionById?: Resolver<Maybe<ResolversTypes['Promotion']>, ParentType, ContextType, RequireFields<QueryPromotionByIdArgs, '_id'>>;
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserInterface']>>>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'limit'>>;
  userById?: Resolver<Maybe<ResolversTypes['UserInterface']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, '_id'>>;
  admins?: Resolver<Array<ResolversTypes['Admin']>, ParentType, ContextType, RequireFields<QueryAdminsArgs, 'limit'>>;
  adminById?: Resolver<Maybe<ResolversTypes['Admin']>, ParentType, ContextType, RequireFields<QueryAdminByIdArgs, '_id'>>;
  customers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryCustomersArgs, 'limit'>>;
  customerById?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryCustomerByIdArgs, '_id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  orders?: Resolver<Array<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrdersArgs, 'limit'>>;
  orderById?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType, RequireFields<QueryOrderByIdArgs, '_id'>>;
};

export interface RegExpAsStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['RegExpAsString'], any> {
  name: 'RegExpAsString';
}

export type RemoveByIdProductPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveByIdProductPayload'] = ResolversParentTypes['RemoveByIdProductPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveByIdPromotionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveByIdPromotionPayload'] = ResolversParentTypes['RemoveByIdPromotionPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Promotion']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RemoveByIdUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveByIdUserPayload'] = ResolversParentTypes['RemoveByIdUserPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['UserInterface']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RuntimeErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['RuntimeError'] = ResolversParentTypes['RuntimeError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateByIdCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateByIdCustomerPayload'] = ResolversParentTypes['UpdateByIdCustomerPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateByIdOrderPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateByIdOrderPayload'] = ResolversParentTypes['UpdateByIdOrderPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateByIdProductPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateByIdProductPayload'] = ResolversParentTypes['UpdateByIdProductPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateByIdPromotionPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateByIdPromotionPayload'] = ResolversParentTypes['UpdateByIdPromotionPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['Promotion']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateByIdUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateByIdUserPayload'] = ResolversParentTypes['UpdateByIdUserPayload']> = {
  recordId?: Resolver<Maybe<ResolversTypes['MongoID']>, ParentType, ContextType>;
  record?: Resolver<Maybe<ResolversTypes['UserInterface']>, ParentType, ContextType>;
  error?: Resolver<Maybe<ResolversTypes['ErrorInterface']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['EnumDKeyUserRole']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserInterfaceResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserInterface'] = ResolversParentTypes['UserInterface']> = {
  __resolveType: TypeResolveFn<'Admin' | 'Customer' | 'User', ParentType, ContextType>;
  _id?: Resolver<ResolversTypes['MongoID'], ParentType, ContextType>;
  role?: Resolver<Maybe<ResolversTypes['EnumDKeyUserRole']>, ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ValidationErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidationError'] = ResolversParentTypes['ValidationError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errors?: Resolver<Maybe<Array<ResolversTypes['ValidatorError']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidatorErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidatorError'] = ResolversParentTypes['ValidatorError']> = {
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  path?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  idx?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Admin?: AdminResolvers<ContextType>;
  CreateOneAdminPayload?: CreateOneAdminPayloadResolvers<ContextType>;
  CreateOneCustomerPayload?: CreateOneCustomerPayloadResolvers<ContextType>;
  CreateOneOrderPayload?: CreateOneOrderPayloadResolvers<ContextType>;
  CreateOneProductPayload?: CreateOneProductPayloadResolvers<ContextType>;
  CreateOnePromotionPayload?: CreateOnePromotionPayloadResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  Date?: GraphQLScalarType;
  ErrorInterface?: ErrorInterfaceResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LoginPayload?: LoginPayloadResolvers<ContextType>;
  MongoError?: MongoErrorResolvers<ContextType>;
  MongoID?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Products?: ProductsResolvers<ContextType>;
  ProductsInterface?: ProductsInterfaceResolvers<ContextType>;
  Promotion?: PromotionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegExpAsString?: GraphQLScalarType;
  RemoveByIdProductPayload?: RemoveByIdProductPayloadResolvers<ContextType>;
  RemoveByIdPromotionPayload?: RemoveByIdPromotionPayloadResolvers<ContextType>;
  RemoveByIdUserPayload?: RemoveByIdUserPayloadResolvers<ContextType>;
  RuntimeError?: RuntimeErrorResolvers<ContextType>;
  UpdateByIdCustomerPayload?: UpdateByIdCustomerPayloadResolvers<ContextType>;
  UpdateByIdOrderPayload?: UpdateByIdOrderPayloadResolvers<ContextType>;
  UpdateByIdProductPayload?: UpdateByIdProductPayloadResolvers<ContextType>;
  UpdateByIdPromotionPayload?: UpdateByIdPromotionPayloadResolvers<ContextType>;
  UpdateByIdUserPayload?: UpdateByIdUserPayloadResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserInterface?: UserInterfaceResolvers<ContextType>;
  ValidationError?: ValidationErrorResolvers<ContextType>;
  ValidatorError?: ValidatorErrorResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>;
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>;
  entity?: EntityDirectiveResolver<any, any, ContextType>;
  column?: ColumnDirectiveResolver<any, any, ContextType>;
  id?: IdDirectiveResolver<any, any, ContextType>;
  link?: LinkDirectiveResolver<any, any, ContextType>;
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>;
  map?: MapDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';