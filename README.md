# Sales Management System

A React application for managing products, inventory, customers and sales. This project was developed during the EAD Hardware BR Front-end course and is being organized as a portfolio project.

## Features

- User authentication with login, session restoration and logout.
- Protected routes for authenticated areas.
- Product listing with name search and pagination.
- Product creation, editing and deletion.
- REST API integration through Axios.
- Automated tests for authentication and product services.
- ESLint, production build and continuous integration setup.

## Tech stack

- React 19
- Vite 8
- React Router
- Material UI (MUI)
- Axios
- JSON Server Auth
- Vitest
- ESLint

## Requirements

- Node.js 22 or newer
- npm

Node.js 22 is recommended because the current Vite toolchain uses Rolldown, which depends on APIs available in recent Node versions.

## Running locally

```bash
git clone https://github.com/AriadniAdi/sistema-sales.git
cd sistema-sales
npm install
```

Start the local API in one terminal:

```bash
npm run server
```

Start the front-end in another terminal:

```bash
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run server` | Starts the local API using `salesSystem.json`. |
| `npm run test` | Runs the Vitest test suite. |
| `npm run lint` | Checks code quality with ESLint. |
| `npm run build` | Creates the production build. |
| `npm run preview` | Serves the production build locally. |

## Authentication

Authentication is simulated by `json-server-auth`. The service is implemented in [`src/services/authService.js`](src/services/authService.js) and provides:

- `login(username, password)`: authenticates the user and stores the token.
- `getMe()`: restores the current authenticated user.
- `logout()`: clears the local session.

The Axios client in [`src/services/api.js`](src/services/api.js) automatically sends the stored token in the `Authorization` header.

Demo credentials:

```text
Username: admin
Password: 1234
```

## Project structure

```text
.
├── salesSystem.json
├── public/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   ├── home/
│   │   ├── product/
│   │   └── shared/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── tests/
└── package.json
```

The code is organized by feature, with presentation hooks and pages separated from data services. This keeps UI responsibilities, state orchestration and API communication easier to evolve independently.

## Quality checks

```bash
npm run test
npm run lint
npm run build
```

## Project status

The authentication flow and product catalog are implemented. Customer and sales modules are planned for the next development stages.

## Author

Developed by **Ariadni Adi** as a practical project for the EAD Hardware BR Front-end course.
