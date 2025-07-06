# Criptografia de Senhas

## Implementação

A criptografia de senhas foi implementada usando a biblioteca `bcryptjs`, que é uma das mais seguras e amplamente utilizadas para criptografia de senhas.

### Mudanças Realizadas

1. **Instalação de dependências:**
   - `bcryptjs`: Biblioteca para criptografia de senhas
   - `@types/bcryptjs`: Tipos TypeScript para bcryptjs
   - `ts-node`: Para execução de scripts TypeScript

2. **Modificações na API (`src/app/api/users/route.ts`):**
   - **Registro:** As senhas agora são criptografadas antes de serem salvas no banco de dados
   - **Login:** A verificação de senha agora usa `bcrypt.compare()` para comparar a senha fornecida com o hash armazenado

### Como Funciona

#### Registro de Usuário
```typescript
// Criptografar a senha antes de salvar
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(password, saltRounds);

await prisma.user.create({
  data: { id: randomUUID(), name, email, password: hashedPassword },
});
```

#### Login de Usuário
```typescript
// Buscar usuário apenas pelo email
const user = await prisma.user.findUnique({ where: { email } });

// Verificar se a senha está correta usando bcrypt
const isPasswordValid = await bcrypt.compare(password, user.password);
if (!isPasswordValid) {
  // Retornar erro de autenticação
}
```

### Migração de Senhas Existentes

Se você tem usuários com senhas não criptografadas no banco de dados, execute o script de migração:

```bash
npm run migrate-passwords
```

Este script irá:
1. Buscar todos os usuários no banco de dados
2. Verificar se a senha já está criptografada
3. Criptografar senhas que ainda não foram processadas
4. Atualizar o banco de dados com as senhas criptografadas

### Segurança

- **Salt Rounds:** Configurado para 12 rounds, oferecendo um bom equilíbrio entre segurança e performance
- **Hash Seguro:** bcrypt é resistente a ataques de força bruta e rainbow tables
- **Não Reversível:** As senhas não podem ser descriptografadas, apenas verificadas

### Compatibilidade

- ✅ Novos registros: Senhas são automaticamente criptografadas
- ✅ Login existente: Funciona com senhas criptografadas
- ✅ Migração: Script disponível para migrar senhas antigas
- ✅ Frontend: Não requer mudanças, pois a criptografia é transparente

### Comandos Úteis

```bash
# Instalar dependências
npm install bcryptjs @types/bcryptjs

# Executar migração de senhas
npm run migrate-passwords

# Verificar se tudo está funcionando
npm run dev
``` 