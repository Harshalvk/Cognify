import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "../ui/sonner";
import { TRPCReactProvider } from "@/trpc/clients/client";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TRPCReactProvider>{children}</TRPCReactProvider>
      <Toaster />
    </ThemeProvider>
  );
};

export default AppProvider;
