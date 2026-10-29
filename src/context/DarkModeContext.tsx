import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type DarkModeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

type DarkModeroviderProps = {
  children: ReactNode;
};

export function DarkModeProvider({ children }: DarkModeroviderProps) {
    const [darkMode, setDarkMode] = useState(false);
    const toggleDarkMode = () => {
        setDarkMode( mode => !mode );
        updateDarkMode(!darkMode);
    }

    useEffect( () => {
        const localTheme = window.localStorage.getItem('theme') === 'dark';
        setDarkMode(localTheme);
        updateDarkMode(localTheme);
    }, [] );
    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

function updateDarkMode(darkMode: boolean) {
    if(darkMode) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('theme', 'light');
    }
}
export const useDarkMode = () => {
    const context = useContext(DarkModeContext);
    if ( context === undefined ) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }

    return context;
}