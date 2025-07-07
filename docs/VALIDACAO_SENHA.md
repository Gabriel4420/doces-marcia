# Validação de Senha - Documentação

## Visão Geral

Este projeto implementa uma validação de senha robusta que garante a segurança das contas dos usuários. A validação inclui múltiplos requisitos de segurança e feedback visual em tempo real.

## Requisitos da Senha

A senha deve atender aos seguintes critérios:

1. **Comprimento**: Mínimo de 6 caracteres e máximo de 12 caracteres
2. **Letra maiúscula**: Pelo menos uma letra maiúscula (A-Z)
3. **Letra minúscula**: Pelo menos uma letra minúscula (a-z)
4. **Número**: Pelo menos um número (0-9)
5. **Caractere especial**: Pelo menos um caractere especial (!@#$%^&*()_+-=[]{}|;:,.<>?)

## Componentes Implementados

### 1. Schema de Validação (`src/helpers/zodSchemas.ts`)

```typescript
export const passwordSchema = z
  .string()
  .min(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  .max(12, { message: "A senha deve ter no máximo 12 caracteres" })
  .regex(/[A-Z]/, { message: "A senha deve conter pelo menos uma letra maiúscula" })
  .regex(/[a-z]/, { message: "A senha deve conter pelo menos uma letra minúscula" })
  .regex(/[0-9]/, { message: "A senha deve conter pelo menos um número" })
  .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, { 
    message: "A senha deve conter pelo menos um caractere especial" 
  });
```

### 2. Componente de Força da Senha (`src/components/ui/password-strength.tsx`)

Componente visual que mostra:
- Barra de progresso da força da senha
- Lista de requisitos com ícones de check/x
- Mensagem de sucesso quando todos os requisitos são atendidos

### 3. Hook de Validação (`src/hooks/use-password-validation.ts`)

Hook personalizado que fornece:
- Validação em tempo real
- Cálculo da força da senha
- Status de cada requisito
- Mensagens de erro detalhadas

## Como Usar

### 1. Validação Básica

```typescript
import { passwordSchema } from '@/helpers/zodSchemas';

try {
  passwordSchema.parse(senha);
  console.log('Senha válida!');
} catch (error) {
  console.log('Erro na validação:', error.errors);
}
```

### 2. Componente de Força da Senha

```typescript
import { PasswordStrength } from '@/components/ui/password-strength';

<PasswordStrength password={senha} className="mt-3" />
```

### 3. Hook de Validação

```typescript
import { usePasswordValidation } from '@/hooks/use-password-validation';

const { validationResult, updateValidation } = usePasswordValidation();

// Atualizar validação quando a senha mudar
const handlePasswordChange = (e) => {
  updateValidation(e.target.value);
};
```

## Exemplos de Senhas Válidas

- `Teste123!`
- `Minha@Senha1`
- `Secure#2024`

## Exemplos de Senhas Inválidas

- `teste` (muito curta, sem maiúscula, sem número, sem caractere especial)
- `TESTE123!` (sem minúscula)
- `teste123!` (sem maiúscula)
- `TesteSenha!` (sem número)
- `Teste123` (sem caractere especial)

## Integração com Formulários

### Registro de Usuário

```typescript
import { registerFormSchema } from '@/helpers/zodSchemas';

const validateForm = () => {
  try {
    registerFormSchema.parse({
      name: nome,
      email,
      password: senha,
      confirmPassword: confirmarSenha
    });
    return true;
  } catch (error) {
    // Tratar erros de validação
    return false;
  }
};
```

### Login

```typescript
import { loginFormSchema } from '@/helpers/zodSchemas';

const validateForm = () => {
  try {
    loginFormSchema.parse({
      email,
      password
    });
    return true;
  } catch (error) {
    // Tratar erros de validação
    return false;
  }
};
```

## Personalização

### Alterando Requisitos

Para modificar os requisitos de senha, edite o arquivo `src/helpers/zodSchemas.ts`:

```typescript
export const passwordSchema = z
  .string()
  .min(8, { message: "A senha deve ter pelo menos 8 caracteres" }) // Alterar mínimo
  .max(20, { message: "A senha deve ter no máximo 20 caracteres" }) // Alterar máximo
  // ... outros requisitos
```

### Personalizando Mensagens

As mensagens de erro podem ser personalizadas no schema:

```typescript
.regex(/[A-Z]/, { message: "Sua mensagem personalizada aqui" })
```

### Estilização do Componente

O componente `PasswordStrength` aceita uma prop `className` para estilização personalizada:

```typescript
<PasswordStrength 
  password={senha} 
  className="mt-3 p-4 bg-blue-50 rounded-lg" 
/>
```

## Segurança

- As senhas são validadas tanto no frontend quanto no backend
- A validação no frontend melhora a experiência do usuário
- A validação no backend garante a segurança dos dados
- As senhas são sempre criptografadas antes de serem armazenadas

## Testes

Para testar a validação de senha, você pode usar o componente de teste:

```typescript
import { PasswordTest } from '@/components/ui/password-test';

// Adicione este componente em qualquer página para testar
<PasswordTest />
```

## Suporte

Para dúvidas ou problemas com a validação de senha, consulte:
- Arquivo de schema: `src/helpers/zodSchemas.ts`
- Componente de força: `src/components/ui/password-strength.tsx`
- Hook de validação: `src/hooks/use-password-validation.ts` 