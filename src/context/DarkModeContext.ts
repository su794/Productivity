import { createContext, type ReactNode } from "react";

export type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export type DarkModeProviderProps = {
  children: ReactNode;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);