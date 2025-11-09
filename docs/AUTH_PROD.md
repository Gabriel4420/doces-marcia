# Autenticação em Produção

Configure corretamente o ambiente para evitar erros `401 (Unauthorized)` na rota `/api/auth/me`.

## Variáveis de Ambiente

- `JWT_SECRET`: segredo forte para assinar e validar o JWT.
- `CORS_ORIGIN`: origem permitida para chamadas (ex.: `https://seu-dominio.com`).
- `AUTH_COOKIE_SECURE`: `true` para HTTPS, `false` se estiver em HTTP.
- `AUTH_COOKIE_SAMESITE`: `Strict`, `Lax` ou `None` (use `None` para cenários cross-site com `Secure`).
- `AUTH_COOKIE_DOMAIN`: domínio do cookie caso use subdomínios (ex.: `.seu-dominio.com`).

## Rotas e Middleware

- `/api/users` (login/registro): retorna cookie `token` com flags configuráveis.
- `/api/auth/me`: valida o token e inclui cabeçalhos CORS com credenciais.
- `middleware`: valida JWT no Edge Runtime usando `jose`.

## Diagnóstico de 401

- Verifique se o cookie `token` está presente nas chamadas ao `api/auth/me`.
- Em produção, confirme que o protocolo é HTTPS quando `AUTH_COOKIE_SECURE=true`.
- Compare variáveis entre ambientes (build vs. runtime) para garantir consistência.
- Inspecione os logs do servidor: handlers de auth retornam mensagens detalhadas quando a validação falha.