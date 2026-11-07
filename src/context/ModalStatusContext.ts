import { createContext, type ReactNode } from "react";

export type ModalStatusContextType = {
  modalStatus: boolean;
  toggleModalStatus: () => void;
};

export type ModalStatusProviderProps = {
  children: ReactNode;
};

export const ModalStatusContext = createContext<ModalStatusContextType | undefined>(undefined);