# Sistema de Vendas

Aplicação web para gerenciamento de produtos e estoque, desenvolvida durante o curso de Front-end do EAD Hardware BR.

O projeto faz parte do desafio **Sistema de Gerenciamento de Vendas**, cuja proposta é construir uma aplicação React com autenticação, navegação protegida e integração com uma API REST. Esta versão representa a etapa atual do desenvolvimento e está sendo organizada como projeto de portfólio.

## Visão geral

O sistema foi pensado para uma loja de produtos de informática e eletrônicos. A aplicação utiliza uma API local baseada em JSON para persistir os dados e oferece uma base preparada para a evolução das funcionalidades de clientes e vendas.

### Funcionalidades implementadas

- Listagem de produtos.
- Pesquisa de produtos por nome.
- Cadastro, edição e exclusão de produtos.
- Serviço de autenticação com login, consulta do usuário atual e logout.
- Persistência do token de autenticação no `localStorage`.
- Inclusão automática do token nas requisições por interceptor do Axios.
- Testes automatizados dos serviços de autenticação e produtos.

### Próximas funcionalidades

- Tela de login integrada à interface.
- Rotas protegidas para as áreas internas.
- Cadastro, pesquisa, edição e exclusão de clientes.
- Registro de vendas com cliente, produtos, quantidades e cálculo do total.
- Atualização automática do estoque após uma venda.
- Consulta detalhada do histórico de vendas.

## Tecnologias utilizadas

- React 19
- Vite 8
- React Router
- Material UI (MUI)
- Axios
- JSON Server Auth
- Vitest
- ESLint

## Pré-requisitos

- Node.js 22 ou superior
- npm

O Node.js 22 é recomendado porque a versão atual do Vite utiliza o Rolldown, que depende de APIs disponíveis em versões recentes do Node.

## Como executar o projeto

```bash
git clone https://github.com/AriadniAdi/sistema-vendas.git
cd sistema-vendas
npm install
```

Em um terminal, inicie a API local:

```bash
npm run server
```

Em outro terminal, inicie a aplicação:

```bash
npm run dev
```

Depois, acesse a URL indicada pelo Vite, normalmente `http://localhost:5173`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run server` | Inicia a API local com `baseSistemaVendas.json`. |
| `npm run test` | Executa os testes automatizados com Vitest. |
| `npm run lint` | Verifica problemas de qualidade no código. |
| `npm run build` | Gera a versão otimizada para produção. |
| `npm run preview` | Serve localmente o build de produção. |

## Autenticação

O projeto utiliza o `json-server-auth` para simular a autenticação da API. O serviço está em [`src/services/authService.js`](src/services/authService.js) e possui três operações:

- `login(username, password)` — autentica o usuário e salva o token.
- `getMe()` — recupera os dados do usuário autenticado.
- `logout()` — remove a sessão local.

O arquivo [`src/services/api.js`](src/services/api.js) configura o cliente Axios e adiciona o token salvo no `localStorage` ao cabeçalho `Authorization`.

As credenciais iniciais documentadas no desafio são:

```text
Usuário: admin
Senha: 1234
```

## Organização do projeto

```text
.
├── baseSistemaVendas.json
├── public/
├── src/
│   ├── pages/
│   │   ├── ProdutoModal.jsx
│   │   └── ProdutosList.jsx
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   └── produtoService.js
│   ├── App.jsx
│   └── main.jsx
├── tests/
│   └── services/
│       ├── authService.test.js
│       └── produtoService.test.js
└── package.json
```

## Testes e qualidade

A suíte atual cobre login, recuperação do usuário, logout, listagem e pesquisa de produtos, além de criação, atualização e exclusão.

Para executar as verificações:

```bash
npm test
npm run lint
npm run build
```

## Aprendizados

Este projeto exercita componentização com React, hooks, navegação no cliente, consumo de APIs REST, autenticação, organização por páginas e serviços, testes automatizados e integração contínua.

## Status do projeto

Em desenvolvimento. O catálogo de produtos e a camada inicial de autenticação estão implementados. As áreas de clientes, vendas e proteção completa das rotas serão adicionadas nas próximas etapas do desafio.

## Autor

Desenvolvido por **Ariadni Adi** como projeto prático do curso de Front-end do EAD Hardware BR.
