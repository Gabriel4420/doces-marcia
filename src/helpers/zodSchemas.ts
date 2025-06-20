import { z } from "zod";

export const userFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  documentId: z
    .string()
    .min(11, { message: "O CPF deve ter pelo menos 11 caracteres" })
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { message: "CPF inválido" }),
  email: z.string().email({ message: "Email inválido" }),
  phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
    message: "Número de telefone inválido",
  }),
});

export const addressFormSchema = z.object({
  zipCode: z.string().min(8, "Preencha o código postal"),
  street: z.string().min(2, "Preencha o endereço"),
  number: z.string().min(2, "Preencha o numero"),
  complement: z.string().min(2, "Preencha o complemento"),
  district: z.string().min(2, "Preencha o bairro"),
  city: z.string().min(2, "Preencha a cidade"),
  state: z.string().min(2, "Preencha o estado"),
});
