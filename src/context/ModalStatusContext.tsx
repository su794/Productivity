import { createContext, useContext, useState, type ReactNode } from "react";

type ModalStatusContextType = {
  modalStatus: boolean;
  toggleModalStatus: () => void;
};

const ModalStatusContext = createContext<ModalStatusContextType | undefined>(undefined);

type ModalStatusProviderProps = {
  children: ReactNode;
};

export function ModalStatusProvider({ children }: ModalStatusProviderProps) {
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

function updateModalStatus(modalStatus: boolean) {
    if (modalStatus) {
        document.documentElement.classList.add("modal-open");
    } else {
        document.documentElement.classList.remove("modal-open");
    }
}

export const useModalStatus = () => {
  const context = useContext(ModalStatusContext);
  if (context === undefined) {
    throw new Error("useModalStatus must be used within a ModalStatusProvider");
  }
  return context;
};