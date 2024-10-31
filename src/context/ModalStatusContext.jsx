import { createContext, useContext, useState } from "react";

const ModalStatusContext = createContext();

export function ModalStatusProvider({ children }) {
    const [modalStatus, setModalStatus] = useState(false);
    const toggleModalStatus = () => {
        setModalStatus( status => !status );
        updateModalStatus(!modalStatus);
    }

    return (
        <ModalStatusContext.Provider value={{modalStatus, toggleModalStatus}}>
            {children}
        </ModalStatusContext.Provider>
    )
}

function updateModalStatus(modalStatus) {
    if(modalStatus) {
        document.documentElement.classList.add('modal-open');
    } else {
        document.documentElement.classList.remove('modal-open');
    }
}
export const useModalStatus = () => useContext(ModalStatusContext);