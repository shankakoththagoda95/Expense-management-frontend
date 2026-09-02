import { createContext } from 'react'

interface ThemeContextType {
  theme: 'light' | 'dark'
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
)

export { ThemeContext }
export type { ThemeContextType }