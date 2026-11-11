import { useEffect, useState } from "react";
import { ModalStatusContext, type ModalStatusProviderProps } from "./ModalStatusContext";

export function ModalStatusProvider({ children }: ModalStatusProviderProps) {
    const [modalStatus, setModalStatus] = useState(false);
    const toggleModalStatus = () => {
        setModalStatus( status => !status );
    }

    useEffect(() => {
      document.documentElement.classList.toggle("modal-open", modalStatus);
    }, [modalStatus]);

    return (
        <ModalStatusContext.Provider value={{modalStatus, toggleModalStatus}}>
            {children}
        </ModalStatusContext.Provider>
    )
}