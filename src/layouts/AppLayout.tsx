import { Link, Outlet, useNavigate } from 'react-router-dom'

import { useAuth } from '../hooks/AuthContext'

function AppLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            to="/dashboard"
            className="text-xl font-bold text-gray-900"
          >
            Expense Manager
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </Link>

            <Link
              to="/expenses"
              className="text-gray-600 hover:text-gray-900"
            >
              Expenses
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-900"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}

export default AppLayout