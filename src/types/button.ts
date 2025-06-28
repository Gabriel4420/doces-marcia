import { VariantProps } from "class-variance-authority";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<any> {
  asChild?: boolean;
} 