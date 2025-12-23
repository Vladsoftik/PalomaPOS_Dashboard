import { ReactNode } from 'react'
import { ThemeProvider } from '../../contexts/ThemeContext'
import { LanguageProvider } from '../../contexts/LanguageContext'
import { AuthProvider } from '../../contexts/AuthContext'
import { Toaster } from 'sonner'

interface AppProvidersProps {
  children: ReactNode
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          {children}
          <Toaster position="top-right" />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}





