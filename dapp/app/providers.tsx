'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import { useState, useEffect } from 'react'
import { MetaMaskProvider } from '../contexts/MetaMaskContext'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setHydrated(true)
    console.log('Providers mounted')
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {hydrated ? (
          <MetaMaskProvider>
            {children}
          </MetaMaskProvider>
        ) : (
          <div id="hydration-fallback" aria-hidden className="h-screen" />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  )
}