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

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve ter pelo menos 10 caracteres" })
    .max(500, { message: "A mensagem deve ter no máximo 500 caracteres" }),
});

// Schema de validação de senha robusto
export const passwordSchema = z
  .string()
  .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  .max(12, { message: "A senha deve ter no máximo 12 caracteres" })
  .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
  .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { 
    message: "A senha deve conter pelo menos um caractere especial (!@#$%^&*()_+-=[]{}|;:,.<>?)" 
  });

// Schema para registro de usuário com validação de senha
export const registerFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  password: passwordSchema,
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

// Schema para login
export const loginFormSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(1, { message: "A senha é obrigatória" }),
});
