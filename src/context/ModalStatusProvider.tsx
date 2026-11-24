import { useEffect, useState } from "react";
import { ModalStatusContext, type ModalStatusProviderProps } from "./ModalStatusContext";

export function ModalStatusProvider({ children }: ModalStatusProviderProps) {
    const [modalStatus, setModalStatus] = useState(false);

    const openModal = () => {
        document.documentElement.classList.add("modal-open");
        setModalStatus( true );
        console.log('open');
    }

    const closeModal = () => {
        document.documentElement.classList.remove('modal-open');
        setModalStatus( false );
    }

    useEffect(() => {
      document.documentElement.classList.toggle("modal-open", modalStatus);
    }, [modalStatus]);

    return (
        <ModalStatusContext.Provider value={{modalStatus, openModal, closeModal}}>
            {children}
        </ModalStatusContext.Provider>
    )
}