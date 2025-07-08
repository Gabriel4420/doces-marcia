# Sistema de Consentimento de Cookies

Este documento descreve o sistema de consentimento de cookies implementado no projeto Delicias da Márcia.

## Componentes Criados

### 1. CookieConsent (`src/components/cookie-consent.tsx`)
Componente principal que exibe o banner de consentimento de cookies na parte inferior da tela.

**Características:**
- Aparece automaticamente para novos usuários
- Permite aceitar todos os cookies ou recusar
- Inclui seção expansível com detalhes sobre tipos de cookies
- Salva a escolha do usuário no localStorage
- Design responsivo e acessível

### 2. CookieNotification (`src/components/cookie-notification.tsx`)
Componente que exibe notificações toast após o usuário fazer sua escolha.

**Funcionalidades:**
- Mostra toast de confirmação baseado na escolha do usuário
- Diferentes mensagens para diferentes níveis de consentimento
- Integração com o sistema de toast existente

### 3. CookieSettings (`src/components/cookie-settings.tsx`)
Componente para gerenciar configurações de cookies posteriormente.

**Recursos:**
- Modal com configurações detalhadas
- Toggles para cada tipo de cookie
- Cookies essenciais sempre ativos (não podem ser desabilitados)
- Salva preferências atualizadas

### 4. useCookieConsent (`src/hooks/use-cookie-consent.ts`)
Hook personalizado para gerenciar o estado do consentimento de cookies.

**Métodos disponíveis:**
- `acceptAll()`: Aceita todos os cookies
- `declineAll()`: Recusa cookies opcionais
- `updatePreferences()`: Atualiza preferências específicas
- `hasConsented`: Verifica se o usuário já consentiu
- `preferences`: Retorna as preferências atuais

## Tipos de Cookies

### Cookies Essenciais
- **Sempre ativos**
- Necessários para funcionamento básico do site
- Incluem autenticação, segurança e preferências básicas

### Cookies de Análise
- **Opcionais**
- Ajudam a entender como o usuário usa o site
- Usados para melhorar serviços

### Cookies de Marketing
- **Opcionais**
- Usados para personalizar anúncios e conteúdo
- Baseados em interesses do usuário

## Implementação

### Layout Principal
O sistema está integrado no layout principal (`src/app/layout.tsx`):

```tsx
import { CookieConsent } from "@/components/cookie-consent";
import { CookieNotification } from "@/components/cookie-notification";

// No JSX:
<Toaster />
<CookieConsent />
<CookieNotification />
```

### Footer
O componente de configurações está disponível no footer:

```tsx
import { CookieSettings } from "@/components/cookie-settings";

// No footer:
<CookieSettings />
```

## Armazenamento

As preferências são salvas no localStorage com as seguintes chaves:
- `cookie-consent`: Status do consentimento e timestamp
- `cookie-preferences`: Preferências específicas de cada tipo de cookie

## Conformidade com LGPD

O sistema foi desenvolvido considerando os requisitos da LGPD:

1. **Consentimento Explícito**: Usuário deve aceitar ativamente
2. **Granularidade**: Diferentes tipos de cookies podem ser aceitos/recusados separadamente
3. **Transparência**: Informações claras sobre cada tipo de cookie
4. **Acesso Fácil**: Configurações sempre acessíveis no footer
5. **Retirada do Consentimento**: Usuário pode alterar preferências a qualquer momento

## Personalização

### Cores e Estilo
O sistema usa as variáveis CSS do tema atual:
- `bg-background`: Fundo do banner
- `border-border`: Borda do banner
- `text-primary`: Cor dos ícones
- `text-muted-foreground`: Texto secundário

### Textos
Todos os textos podem ser facilmente modificados nos componentes:
- Mensagens do banner
- Descrições dos tipos de cookies
- Textos dos botões
- Mensagens de notificação

### Timing
- Banner aparece após 1 segundo do carregamento da página
- Notificações aparecem após 500ms da escolha do usuário

## Uso em Outros Projetos

Para usar este sistema em outros projetos:

1. Copie os componentes para o novo projeto
2. Instale as dependências necessárias (Radix UI, Lucide React)
3. Integre no layout principal
4. Personalize textos e estilos conforme necessário
5. Ajuste os tipos de cookies conforme as necessidades do projeto

## Dependências

- `@radix-ui/react-dialog`: Para o modal de configurações
- `@radix-ui/react-toggle`: Para os toggles de configuração
- `lucide-react`: Para os ícones
- Sistema de toast existente: Para notificações 