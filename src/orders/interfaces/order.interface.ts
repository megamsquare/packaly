// src/orders/interfaces/order.interface.ts
export interface Order {
  _id?: string;
  dropoff: {
    address: string;
    city: string;
    country: string;
    email: string;
    name: string;
    zipcode: string;
    phonenumber: string;
  };
  pickup: {
    address: string;
    city: string;
    country: string;
    email: string;
    phonenumber: string;
    zipcode: string;
    name: string;
  };
  packages: {
    height: number;
    length: number;
    width: number;
    weight: number;
  }[];
  status: string;
  price?: number;
}

export interface OrderResponse {
  _id?: string;
  dropoff: {
    address: string;
    city: string;
    country: string;
    email: string;
    name: string;
    zipcode: string;
    phonenumber: string;
  };
  pickup: {
    address: string;
    city: string;
    country: string;
    email: string;
    phonenumber: string;
    zipcode: string;
    name: string;
  };
  packages: {
    height: number;
    length: number;
    width: number;
    weight: number;
  }[];
  status: string;
  price?: number;
}
