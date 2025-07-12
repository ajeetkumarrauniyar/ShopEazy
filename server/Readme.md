# Invoice Generator Server

A Node.js Express server for an invoice generator application.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env.dev
   cp .env.example .env.prod
   ```
   Then edit the environment files to match your configuration.

3. Build the project:
   ```bash
   npm run build
   ```

## Development

Run the development server:
```bash
npm run dev
```

The server will restart automatically when changes are detected.

## Production

Build and start the production server:
```bash
npm run build
npm start
```

## Code Quality

Format code with Prettier:
```bash
npm run format
```

Lint code with ESLint:
```bash
npm run lint
```

Fix linting issues automatically:
```bash
npm run lint:fix
```

## Project Structure

```
.
├── src/
│   ├── config/
│   │   └── env.ts           # Environment configuration
│   ├── routes/
│   │   └── healthRoute.ts   # Health check route
│   ├── utils/
│   │   ├── index.ts         # Utility exports
│   │   └── logger.ts        # Logging utility
│   └── index.ts             # Main application entry point
├── .env.dev                 # Development environment variables
├── .env.prod                # Production environment variables
├── .env.example             # Example environment variables
├── .eslintrc.json           # ESLint configuration
├── .prettierrc.json         # Prettier configuration
├── package.json             # Package configuration
└── tsconfig.json            # TypeScript configuration
```

## API Endpoints

- `GET /health` - Health check endpoint