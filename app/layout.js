import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContexts";

import { Nunito } from 'next/font/google'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'], // Customize weights as needed
  variable: '--font-nunito',
})




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`lang="en" className={nunito.variable} antialiased`}
      >
           <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
