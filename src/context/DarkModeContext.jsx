import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
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

function updateDarkMode(darkMode) {
    if(darkMode) {
        document.documentElement.classList.add('dark');
        window.localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        window.localStorage.setItem('theme', 'light');
    }
}
export const useDarkMode = () => useContext(DarkModeContext);