import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

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

export const useModalStatus = () => {
  const context = useContext(ModalStatusContext);
  if (context === undefined) {
    throw new Error("useModalStatus must be used within a ModalStatusProvider");
  }
  return context;
};