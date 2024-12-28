import { useContext } from "react";
import { TableContext } from "./TableContext";

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error('ERROR: useTable must be used inside a TableProvider');
  }
  return context;
}