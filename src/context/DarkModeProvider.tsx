import { useEffect, useState } from "react";
import { DarkModeContext, type DarkModeProviderProps } from "./DarkModeContext";

export function DarkModeProvider({ children }: DarkModeProviderProps) {
    const [darkMode, setDarkMode] = useState( () => {
        return window.localStorage.getItem('theme') === 'dark';
    });
    const toggleDarkMode = () => setDarkMode( mode => !mode );

    useEffect( () => {
        document.documentElement.classList.toggle('dark', darkMode);
        window.localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode] );
    return (
        <DarkModeContext.Provider value={{darkMode, toggleDarkMode}}>
            {children}
        </DarkModeContext.Provider>
    )
}

