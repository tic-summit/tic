import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContexts";
// app/layout.tsx or layout.js
export const metadata = {
  title: 'Your App',
  description: '...',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      </head>
      <body><AuthProvider>{children}</AuthProvider></body>
    </html>
  );
}

