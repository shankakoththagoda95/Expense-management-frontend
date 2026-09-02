import { createContext } from 'react'

import type { AuthContextType } from './AuthContextTypes'

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
)

export { AuthContext }