import { ReactElement } from "react";

export type ToastActionElement = ReactElement<any>;

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
}

export type ToasterToast = ToastProps & {
  id: string;
};

export interface State {
  toasts: ToasterToast[];
} 