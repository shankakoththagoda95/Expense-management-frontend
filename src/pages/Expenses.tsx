import { useEffect, useState } from 'react'
import ExpenseForm from '../components/ExpenseForm'
import EditExpenseForm from '../components/EditExpenseForm'
import { deleteExpense, getExpenses } from '../services/expenses'
import type { Expense } from '../types/expense'

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null)

  async function loadExpenses() {
    try {
      setError('')
      const data = await getExpenses()
      setExpenses(data.items)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to load expenses',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(expenseId: number) {
    try {
      setError('')
      await deleteExpense(expenseId)
      await loadExpenses()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to delete expense',
      )
    }
  }

  useEffect(() => {
    let isMounted = true

    async function fetchExpenses() {
      try {
        setError('')
        const data = await getExpenses()

        if (isMounted) {
          setExpenses(data.items)
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error
              ? err.message
              : 'Unable to load expenses',
          )
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchExpenses()

    return () => {
      isMounted = false
    }
  }, [])

  if (isLoading) {
    return <p className="text-gray-600 dark:text-gray-400">Loading expenses...</p>
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
        {error}
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Expenses
          </h1>

          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Manage your expenses here.
          </p>

          <ExpenseForm onCreated={loadExpenses} />
        </div>
      </div>
      {editingExpense && (
        <div className="mb-8 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-900">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Edit Expense
          </h2>
          <EditExpenseForm
            expense={editingExpense}
            onUpdated={async () => {
              setEditingExpense(null)
              await loadExpenses()
            }}
            onCancel={() => setEditingExpense(null)}
          />
        </div>
      )}
      {expenses.length === 0 ? (
        <div className="mt-8 rounded-xl bg-white p-8 text-center shadow-sm dark:bg-gray-900">
          <p className="text-gray-600 dark:text-gray-400">
            You don't have any expenses yet.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-900">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b bg-gray-50 dark:border-gray-800 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-600 dark:text-gray-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y dark:divide-gray-800">
                {expenses.map((expense) => (
                  <tr key={expense.id}>
                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                      {new Date(expense.created_at).toLocaleDateString()}
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
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => setEditingExpense(expense)}
                        className="mr-3 text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this expense?')) {
                            handleDelete(expense.id)
                          }
                        }}
                        className="text-sm font-medium text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Expenses