import {
  useEffect,
  useState,
} from 'react'

import type {
  AuthContextType,
  AuthProviderProps,
} from './AuthContextTypes'

import { AuthContext } from './AuthContextValue'

function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('access_token')
  })

  useEffect(() => {
    if (token) {
      localStorage.setItem('access_token', token)
    } else {
      localStorage.removeItem('access_token')
    }
  }, [token])

  function login(newToken: string) {
    setToken(newToken)
  }

  function logout() {
    setToken(null)
  }

  const value: AuthContextType = {
    token,
    isAuthenticated: token !== null,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider }