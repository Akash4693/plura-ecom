// lib/store/checkoutStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

type ShippingDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
};

type PaymentDetails = {
  method: "card" | "cod";
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
};

interface CheckoutState {
  shipping: ShippingDetails | null;
  payment: PaymentDetails | null;
  setShipping: (data: ShippingDetails) => void;
  setPayment: (data: PaymentDetails) => void;
  clearCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutState>()(
  persist(
    (set) => ({
      shipping: null,
      payment: null,
      setShipping: (data) => set({ shipping: data }),
      setPayment: (data) => set({ payment: data }),
      clearCheckout: () => set({ shipping: null, payment: null }),
    }),
    {
      name: "checkout-storage",
    }
  )
);
