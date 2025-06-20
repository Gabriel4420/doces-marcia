import { Dispatch, SetStateAction } from "react";

export type CheckoutProps = {
  checkoutOpen: boolean;
  setCheckoutOpen: (checkoutOpen: boolean) => void;
};

export type Steps = "user" | "address" | "finish";

export type Address = {
  street: string;
  number: string;
  complement?: string | undefined;

  district: string;
  city: string;
  state: string;
  zipCode: string;
};

export type User = {
  name?: string;
  documentId?: string;
  email?: string;
  phone?: string;
};

export type CheckoutStepUserProps = {
  setStep: Dispatch<SetStateAction<Steps>>;
};
