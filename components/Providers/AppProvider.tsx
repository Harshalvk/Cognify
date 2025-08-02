import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "../ui/sonner";
import { TRPCReactProvider } from "@/trpc/clients/client";
import { EdgeStoreProvider } from "@/lib/edgestore";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EdgeStoreProvider>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </ThemeProvider>
    </EdgeStoreProvider>
  );
};

export default AppProvider;
