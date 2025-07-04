import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContexts";
import Header2 from "./test/Header2";
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
      <body><AuthProvider>
        <Header2 />
        {children}</AuthProvider></body>
    </html>
  );
}

