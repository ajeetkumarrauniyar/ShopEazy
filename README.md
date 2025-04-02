/erp-ecommerce-monorepo

│── /apps

│   ├── /web                # Next.js frontend (ERP & eCommerce UI)

             │── /app                    # Next.js App Router (if using App Router)

             │   ├── /dashboard

             │   ├── /products

             │   ├── /orders

             │   ├── /settings

             │── /components             # UI Components (imports from packages/ui)

             │── /hooks                  # Custom React hooks

             │── /providers              # Context providers (Auth, Theme, etc.)

             │── /services               # API functions (fetching data from API)

             │── /utils                  # Web-specific utilities

             │── next.config.js

             │── package.json

│   ├── /api                # Express.js backend (REST API)
             │── /src
                     │   ├── /controllers        # Business logic (Auth, Users, Products, Orders)
                     │   ├── /routes             # API endpoints (Modular: /auth, /users, /products)
                     │   ├── /middlewares        # Middleware (Auth, Error handling, Logger)
                     │   ├── /services           # Database operations & external API calls
                     │   ├── /models             # ORM Models (Shared from packages/db)
                     │   ├── /webhooks           # Clerk webhooks handling
                     │   ├── server.ts           # Express server setup
                     │── package.json

│── /packages

             │   ├── /ui                 # Shared UI components (buttons, modals, forms, etc.)
                          │── /components # Shared UI components
                                 │ ├── Button.tsx
                                 │ ├── Modal.tsx
                                 │ ├── Table.tsx
                                 │── package.json

│   ├── /utils              # Shared utilities (date, currency, validation, etc.)

│   ├── /db                 # Shared database ORM models & migrations
             │── /models                 # Prisma/Sequelize models (User, Tenant, Orders)
             │── /migrations             # Database migrations
             │── index.ts                # DB connection
             │── package.json

│   ├── /auth               # Shared Clerk authentication logic (custom hooks, webhook handlers)
             │── /hooks                  # Custom hooks for authentication
             │── /webhooks               # Clerk webhook handlers
             │── auth.ts                 # Auth utilities (JWT, session management)
             │── package.json

│── /configs                # ESLint, Prettier, Husky, Turbo config files

│── package.json

│── turbo.json

│── README.md

│── .env                  # Environment variables (shared across apps)
│── .env.local            # Local environment variables (for local development)
│── .env.production       # Production environment variables (for deployment)
│── .gitignore