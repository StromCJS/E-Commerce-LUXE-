---
description: Repository Information Overview
alwaysApply: true
---

# Repository Information Overview

## Repository Summary
This repository contains an elegant e-commerce landing page with a React-based frontend and a Node.js/Express backend. The frontend is built using Vite and features a modern UI with Tailwind CSS, MUI, and Radix UI components. The backend provides a mock API using `json-server` and handles payments via Stripe integration.

## Repository Structure
- **backend/**: Node.js Express server with `json-server` for data persistence and Stripe integration.
- **frontend/**: React source code, styles, and Vite configuration.
- **dist/**: Production build output for the frontend.
- **guidelines/**: Project-specific development guidelines and documentation.
- **root**: Frontend package configuration, dependency management, and global configuration files.

### Main Repository Components
- **Frontend**: A React application featuring a navbar, hero section, category grid, product showcase, and footer.
- **Backend API**: A RESTful API built with Express that manages products and orders using a JSON-based database.
- **Payment Gateway**: Integration with Stripe for processing e-commerce transactions.

## Projects

### Frontend (Root & /frontend)
**Configuration File**: `package.json`, `frontend/vite.config.ts`

#### Language & Runtime
**Language**: TypeScript / React  
**Version**: Node.js (Runtime)  
**Build System**: Vite  
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- `react`: ^18.3.1
- `@mui/material`: 7.3.5
- `@radix-ui/react-*`: Various UI components
- `stripe`: ^20.1.2
- `tailwindcss`: 4.1.12
- `lucide-react`: 0.487.0
- `motion`: 12.23.24

**Development Dependencies**:
- `vite`: 6.3.5
- `@vitejs/plugin-react`: 4.7.0
- `@tailwindcss/vite`: 4.1.12

#### Build & Installation
```bash
# Install dependencies
npm i

# Start development server
npm run dev

# Build for production
npm run build
```

#### Main Files & Resources
- **Entry Point**: `frontend/main.tsx` (via `frontend/index.html`)
- **App Component**: `frontend/app/App.tsx`
- **Styles**: `frontend/styles/index.css`, `frontend/styles/theme.css`

---

### Backend API (/backend)
**Configuration File**: `backend/package.json`

#### Language & Runtime
**Language**: JavaScript (Node.js)  
**Version**: Node.js  
**Build System**: Node.js  
**Package Manager**: npm

#### Dependencies
**Main Dependencies**:
- `express`: ^4.18.2
- `json-server`: ^1.0.0-beta.3
- `stripe`: ^14.17.0
- `cors`: ^2.8.5
- `dotenv`: ^16.3.1

**Development Dependencies**:
- `nodemon`: ^3.0.2

#### Build & Installation
```bash
# Navigate to backend
cd backend

# Install dependencies
npm i

# Start server
npm start

# Start in development mode
npm run dev
```

#### Main Files & Resources
- **Entry Point**: `backend/server.js`
- **Database**: `backend/db.json`
- **Routes**: `backend/products.js`, `backend/orders.js`
- **Environment**: `backend/.env` (Configuration for PORT and STRIPE_SECRET_KEY)

#### Usage & Operations
**Key Commands**:
```bash
# Start the backend server (from backend directory)
npm start

# Run mock API with watch mode
npm run api
```
