// types/cart.ts

export type CartProduct = {
    productId: number;
    quantity: number;
  };
  
  export type CartFromAPI = {
    id: number;
    userId: number;
    date: string;
    products: CartProduct[];
    __v: number;
  };
  