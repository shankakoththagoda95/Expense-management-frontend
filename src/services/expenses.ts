import { apiRequest } from './api'
import type {
  CreateExpenseRequest,
  Expense,
  ExpenseListResponse,
  ExpenseSummary,
} from '../types/expense'



export function getExpenses(category?: string) {
  const query = category
    ? `?category=${encodeURIComponent(category)}`
    : ''

  return apiRequest<ExpenseListResponse>(`/expenses${query}`)
}

export function getExpense(expenseId: number) {
  return apiRequest<Expense>(`/expenses/${expenseId}`)
}

export function getExpenseSummary() {
  return apiRequest<ExpenseSummary>('/expenses/summary')
}

export function getRecentExpenses() {
  return apiRequest<ExpenseListResponse>('/expenses?limit=5')
}

export function createExpense(data: CreateExpenseRequest) {
  return apiRequest<Expense>('/expenses', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export function updateExpense(
  expenseId: number,
  data: Partial<CreateExpenseRequest>,
) {
  return apiRequest<Expense>(`/expenses/${expenseId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

export function deleteExpense(expenseId: number) {
  return apiRequest<void>(`/expenses/${expenseId}`, {
    method: 'DELETE',
  })
}