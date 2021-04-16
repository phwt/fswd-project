/**
 * User
 */

export interface User {
  _id: string;
  username: string;
  password: string;
  email: string;
  role: "Admin" | "Customer";
}

export interface Customer extends User {
  billingAddress: string;
  shippingAddress: string;
  phone?: string;
  orderIds: [string];
}

export interface Admin extends User {}

/**
 * Product
 */

export interface IProduct {
  _id: string;
  sku: string;
  name: string;
  detail?: string;
  price: number;
  weight?: number;
  stock: number;
  created: Date;
  modified: Date;
  type: "Product" | "Promotion";
}

export interface Product extends IProduct {}

export interface Promotion extends IProduct {
  discountPercentage: Number;
}

/**
 * Order
 */

export interface Order {
  _id: string;
  status: string;
  timestamp: Date;
  customerId: string;
  productIds: [string];
}
