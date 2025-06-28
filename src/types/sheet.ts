import { ComponentPropsWithoutRef, Dispatch, SetStateAction } from "react";
import { VariantProps } from "class-variance-authority";

export interface SheetContentProps extends ComponentPropsWithoutRef<any>, VariantProps<any> {
  isOpen?: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} 