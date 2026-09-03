import { useState } from 'react'
import type { FormEvent } from 'react'
import { createExpense } from '../services/expenses'
import { expenseCategories } from '../constants/expenseCategories'

interface ExpenseFormProps {
  onCreated: () => void
}

function ExpenseForm({ onCreated }: ExpenseFormProps) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await createExpense({
        amount: Number(amount),
        category,
        description: description || undefined,
      })

      setAmount('')
      setCategory('')
      setDescription('')
      onCreated()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to create expense',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 rounded-lg bg-white p-6 shadow dark:bg-gray-900"
    >
      <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
        Add Expense
      </h2>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Amount
        </label>

        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select a category</option>
          {expenseCategories.map((expenseCategory) => (
            <option key={expenseCategory} value={expenseCategory}>
              {expenseCategory}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
      >
        {isLoading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}

export default ExpenseForm