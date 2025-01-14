import React, { PropsWithChildren } from 'react'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from '@/components/Themes'

export const ThemesProvider = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Theme accentColor="tomato" style={{ height: '100%' }} className="h-full">
        {children}
        {/* <ThemePanel /> */}
      </Theme>
    </ThemeProvider>
  )
}

export default ThemesProvider
