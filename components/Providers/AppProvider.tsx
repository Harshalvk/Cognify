import React from "react";
import { ThemeProvider } from "./ThemeProvider";
import { Toaster } from "../ui/sonner";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute={"class"}
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};

export default AppProvider;
