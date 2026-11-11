import { useContext } from "react";
import { ModalStatusContext } from "./ModalStatusContext";

export const useModalStatus = () => {
  const context = useContext(ModalStatusContext);
  if (context === undefined) {
    throw new Error("useModalStatus must be used within a ModalStatusProvider");
  }
  return context;
};