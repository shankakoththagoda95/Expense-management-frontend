# Expense Management Frontend

A modern React + TypeScript frontend for an Expense Management application.

The application provides authenticated users with a clean interface for managing expenses, viewing expense summaries, filtering expenses by category, and managing their account session.

## Features

- User registration and login
- JWT-based authentication
- Protected application routes
- Automatic authentication persistence using browser storage
- Create expenses
- Edit expenses
- Delete expenses
- View expense history
- Filter expenses by category
- Fixed expense category list
- Expense summary dashboard
- Recent expenses dashboard
- Dark mode / light mode
- Theme persistence
- Responsive UI
- API integration with the FastAPI backend
- Loading and error states
- Production-ready Vite build

## Expense Categories

The application uses a fixed set of expense categories:

- Food
- Transport
- Housing
- Utilities
- Entertainment
- Healthcare
- Shopping
- Education
- Other

These categories are shared across the expense creation form and expense filtering interface.

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Fetch API
- Oxlint

## Project Structure

```text
src/
├── components/
│   ├── EditExpenseForm.tsx
│   ├── ExpenseForm.tsx
│   ├── ProtectedRoute.tsx
│   └── PublicRoute.tsx
├── constants/
│   └── expenseCategories.ts
├── hooks/
│   ├── AuthContext.tsx
│   ├── AuthContextTypes.ts
│   ├── AuthContextValue.ts
│   ├── ThemeContext.tsx
│   ├── ThemeContextValue.ts
│   ├── useAuth.ts
│   └── useTheme.ts
├── layouts/
│   └── AppLayout.tsx
├── pages/
│   ├── Dashboard.tsx
│   ├── Expenses.tsx
│   ├── Login.tsx
│   └── Register.tsx
├── services/
│   ├── api.ts
│   ├── auth.ts
│   └── expenses.ts
├── types/
│   ├── auth.ts
│   └── expense.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Prerequisites

Make sure you have:

- Node.js
- npm
- The Expense Management FastAPI backend running locally or deployed

## Installation

Clone the repository:

```bash
git clone https://github.com/shankakoththagoda95/Expense-management-frontend.git
```

Navigate into the project:

```bash
cd Expense-management-frontend
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

The `VITE_API_BASE_URL` variable defines the URL of the Expense Management API.

### Important

Do not store secrets in `VITE_*` environment variables.

Vite exposes `VITE_*` variables to the client-side application, so they should only contain values that are safe to expose to users.

## Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

## Application Flow

### Authentication

Unauthenticated users can access:

- `/login`
- `/register`

Authenticated users can access:

- `/dashboard`
- `/expenses`

Protected routes redirect unauthenticated users to the login page.

Authenticated users attempting to access public authentication pages are redirected to the dashboard.

### Dashboard

The dashboard provides:

- Total expenses
- Expense count
- Average expense
- Recent expenses

### Expense Management

The Expenses page allows users to:

- Add a new expense
- Edit an existing expense
- Delete an existing expense
- View expense history
- Filter expenses by category

The Add Expense form is displayed in a modal window to keep the page interface clean and focused.

## API Integration

The frontend communicates with the FastAPI backend through a centralized API helper.

The API service:

- Reads the backend URL from `VITE_API_BASE_URL`
- Automatically attaches the stored JWT access token
- Handles API errors
- Supports JSON requests and responses

Example API requests include:

```text
POST /auth/register
POST /auth/login

GET /expenses/
GET /expenses/?category=Food
GET /expenses/summary

POST /expenses/
PUT /expenses/{expense_id}
DELETE /expenses/{expense_id}
```

## Authentication

After successful login, the JWT access token is stored in browser local storage.

The token is automatically included in authenticated API requests using:

```text
Authorization: Bearer <token>
```

Logging out removes the stored access token and redirects the user to the login page.

## Theme

The application supports:

- Light mode
- Dark mode

The selected theme is stored in browser local storage so that the user's preference persists between sessions.

## Code Quality

Run the linter:

```bash
npm run lint
```

The project uses Oxlint for static analysis.

Run TypeScript validation:

```bash
npx tsc --noEmit
```

## Production Build

Create a production build:

```bash
npm run build
```

The optimized files are generated in:

```text
dist/
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

The frontend is designed to be deployed separately from the FastAPI backend.

For production deployment, configure:

```env
VITE_API_BASE_URL=https://your-production-api-url
```

The production API must also be configured to allow requests from the deployed frontend origin through CORS.

## Backend

The corresponding backend repository is:

https://github.com/shankakoththagoda95/Expense-management-app

The backend is built with:

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL
- Alembic
- JWT authentication
- Pytest

## Development Status

Current frontend functionality includes:

- Authentication
- Protected routing
- Expense CRUD operations
- Category filtering
- Fixed expense categories
- Dashboard summaries
- Dark mode
- Responsive UI
- Production build configuration

## License

Project developed by Shanka Koththagoda.
This project is currently intended for educational and development purposes.
