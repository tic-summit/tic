// app/layout.js or app/layout.tsx

import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContexts";
import Header2 from "../components/header/Header2";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "sonner";
import { QueryClientComponent } from "@/services/queryClientComponent";

export const metadata = {
  title: "Your App",
  description: "...",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Embed your Google Fonts here */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-roboto">
        <QueryClientComponent children={children} />
      </body>
    </html>
  );
}
