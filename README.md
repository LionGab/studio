# MãeTech Conecta - Monorepo

Este projeto foi reestruturado para uma arquitetura de monorepo usando Turborepo, com foco em um aplicativo mobile React Native (Expo) e com a capacidade de compartilhar código entre múltiplas plataformas.

## Estrutura

- `apps/mobile`: O aplicativo principal feito com Expo e Expo Router.
- `apps/web`: Futura aplicação web (atualmente um placeholder).
- `packages/shared`: Lógica de negócio compartilhada (hooks, serviços, tipos, IA).
- `packages/api`: Configuração de clientes de API (Firebase, etc).
- `packages/ui`: Componentes de UI reutilizáveis.

## Como Rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
Este comando usará o Turborepo para iniciar o aplicativo Expo.