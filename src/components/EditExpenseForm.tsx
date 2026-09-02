import { useState } from 'react'
import type { FormEvent } from 'react'
import { updateExpense } from '../services/expenses'
import type { Expense } from '../types/expense'

interface EditExpenseFormProps {
  expense: Expense
  onUpdated: () => void
  onCancel: () => void
}

function EditExpenseForm({
  expense,
  onUpdated,
  onCancel,
}: EditExpenseFormProps) {
  const [amount, setAmount] = useState(String(expense.amount))
  const [category, setCategory] = useState(expense.category)
  const [description, setDescription] = useState(expense.description ?? '')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await updateExpense(expense.id, {
        amount: Number(amount),
        category,
        description: description || undefined,
      })

      onUpdated()
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to update expense',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="rounded bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}

      <div>
        <label className="mb-1 block text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Description
        </label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={3}
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isLoading}
          className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>

        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="rounded border px-4 py-2 text-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

export default EditExpenseForm