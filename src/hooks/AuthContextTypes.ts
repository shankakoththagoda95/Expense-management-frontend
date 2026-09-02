import type { ReactNode } from 'react'

export interface AuthContextType {
  token: string | null
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

export interface AuthProviderProps {
  children: ReactNode
}