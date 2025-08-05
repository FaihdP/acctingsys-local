import { useState } from "react";

export interface Warning {
  isVisible: boolean,
  isBlocking: boolean,
  message?: string
} 

export enum INVOICE_WARNINGS {
  TOTAL_INVOICE_IS_ZERO,
  DELETE_PAYMENTS,
  SAVE_PAYMENT_QUESTION,
  RESTAURE_PAYMENTS,
  INVOICE_MIGRATED_CANT_CHANGE_TO_CREATED,
  UPDATE_PRODUCT_QUANTITY
}

export default function useInvoiceWarnings() {
  const [warnings, setWarnings] = useState<Map<INVOICE_WARNINGS, Warning>>(new Map())

  return { warnings, setWarnings }
}