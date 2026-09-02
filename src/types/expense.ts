export interface Expense {
  id: number
  amount: number
  description: string | null
  category: string
  created_at: string
}

export interface ExpenseListResponse {
  items: Expense[]
  page: number
  limit: number
  total: number
  pages: number
}

export interface CreateExpenseRequest {
  amount: number
  description?: string
  category: string
}

export interface ExpenseSummary {
  total_expenses: number
  expense_count: number
  average_expense: number
}