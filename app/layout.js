import './globals.css'

import { UIProvider } from './provider/NextUIProvider'




export const metadata = {
  title: 'TODO',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark text-foreground bg-background">
        <UIProvider>
          {children}
        </UIProvider>
      </body>
    </html>
  )
}
