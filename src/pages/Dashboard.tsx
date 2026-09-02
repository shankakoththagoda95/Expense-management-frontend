import { useEffect, useState } from 'react'

import {
  getExpenseSummary,
  getRecentExpenses,
} from '../services/expenses'
import type { Expense, ExpenseSummary } from '../types/expense'

function Dashboard() {
  const [summary, setSummary] = useState<ExpenseSummary | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [recentExpenses, setRecentExpenses] = useState<Expense[]>([])

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError('')

        const [summaryData, expensesData] = await Promise.all([
          getExpenseSummary(),
          getRecentExpenses(),
        ])

        setSummary(summaryData)
        setRecentExpenses(expensesData.items)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load dashboard',
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-6 text-gray-600 dark:text-gray-400">
          Loading summary...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <div className="mt-6 rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      </div>
    )
  }

  if (!summary) {
    return null
  }

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Here's an overview of your expenses.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-400">
            Total Expenses
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {summary.total_expenses.toFixed(2)}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-400">
            Expense Count
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {summary.expense_count}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <p className="text-sm font-medium text-gray-400">
            Average Expense
          </p>

          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {summary.average_expense.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-xl bg-white shadow-sm dark:bg-gray-900">
          <div className="border-b px-6 py-4 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Recent Expenses
            </h2>
          </div>

          {recentExpenses.length === 0 ? (
            <div className="p-6 text-gray-600 dark:text-gray-400">
              You don't have any expenses yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                      Date
                    </th>

                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                      Category
                    </th>

                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-300">
                      Description
                    </th>

                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-300">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y dark:divide-gray-800">
                  {recentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {new Date(
                          expense.created_at,
                        ).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {expense.category}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {expense.description || '-'}
                      </td>

                      <td className="px-6 py-4 text-right text-sm font-medium text-gray-900 dark:text-white">
                        {expense.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard