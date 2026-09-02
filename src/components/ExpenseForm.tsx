import { useState } from 'react'
import type { FormEvent } from 'react'
import { createExpense } from '../services/expenses'

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
    <form onSubmit={handleSubmit} className="mb-6 rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">Add Expense</h2>

      {error && (
        <p className="mb-4 rounded bg-red-100 p-3 text-red-700">
          {error}
        </p>
      )}

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Amount</label>
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

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Category</label>
        <input
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          required
          className="w-full rounded border px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium">Description</label>
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="w-full rounded border px-3 py-2"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {isLoading ? 'Adding...' : 'Add Expense'}
      </button>
    </form>
  )
}

export default ExpenseForm