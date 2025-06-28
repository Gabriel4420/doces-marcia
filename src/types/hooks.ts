export type ActionType = string;

export type Action =
  | {
      type: ActionType;
      toast: ToasterToast;
    }
  | {
      type: ActionType;
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType;
      toastId?: string;
    };

export interface HooksState {
  toasts: ToasterToast[];
}

export type Toast = Omit<ToasterToast, "id">;

import { ToasterToast } from "./toast"; 