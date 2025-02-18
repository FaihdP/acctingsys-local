import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice";
import { PersonDocument } from "@lib/db/schemas/person/Person";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import { MappedObject } from "@ui/table/interfaces/Row";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode";

export default interface SalesContext {
  isVisiblePersonPopup: boolean,
  setIsVisiblePersonPopup: Dispatch<SetStateAction<boolean>>,
  isVisibleStatusPopup: boolean,
  setIsVisibleStatusPopup: Dispatch<SetStateAction<boolean>>,
  clients: PersonDocument[],
  setClients: Dispatch<SetStateAction<PersonDocument[]>>,
  filterClient: string | null,
  setFilterClient: Dispatch<SetStateAction<string | null>>
  invoiceProducts: Map<string, MappedObject> | null,
  setInvoiceProducts: Dispatch<SetStateAction<Map<string, MappedObject> | null>>,
  errors: Map<string, any>,
  setErrors: Dispatch<SetStateAction<Map<string, any>>>,
  invoice: InvoiceDocument,
  setInvoice: Dispatch<SetStateAction<InvoiceDocument>>,
  handleInputChange: (name: string, value: any) => void,
  handleInputClientChange: (
    value: null | {
      _id: { '$oid': string }
      name: string,
      lastname: string
    }
  ) => void,
  handleInputClientFilterChange: (e: ChangeEvent<HTMLInputElement>) => void,
  handleIsVisiblePersonPopup: () => void,
  handleIsVisibleStatusPopup: () => void,
  handleInputStatusChange: (status: INVOICE_STATUS) => void,
  onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE | null>>,
  invoicePopupMode: INVOICE_POPUP_MODE,
  handleSave: () => Promise<void>
}