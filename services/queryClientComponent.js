"use client";
import react from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContexts";
import ClientLayout from "@/components/ClientLayout";
import { Toaster } from "sonner";


const queryCLient = new QueryClient();

export const QueryClientComponent = ({children}) => {
     return(
      <QueryClientProvider client={queryCLient}>
      
        <AuthProvider>
         <ClientLayout>
          {children}
          <Toaster richColors />
          </ClientLayout>
        </AuthProvider>
    </QueryClientProvider>
     )
}