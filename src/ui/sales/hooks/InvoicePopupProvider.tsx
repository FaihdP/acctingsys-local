import { ChangeEvent, createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import IInvoicePopupContext from "../interfaces/InvoicePopupContext";
import { SessionContext } from "@ui/session/hooks/SessionProvider";
import { PersonDocument } from "@lib/db/schemas/person/Person";
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode";
import { MappedObject } from "@ui/table/interfaces/Row";
import { InvoiceDocument, InvoiceType } from "@lib/db/schemas/invoice/Invoice";
import { formatDate, getDateTime } from "@lib/util/time";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import mapData from "@ui/table/util/mapData";
import getInvoiceProductsByInvoiceId from "@lib/services/invoiceProduct/getInvoiceProductsByInvoiceId";
import getDatabaseFilterObject from "@ui/core/util/getDatabaseFilterObject";
import getClients from "@lib/services/client/getClients";
import handleSaveInvoice from "@lib/controllers/invoice/handleSave";
import { NotificationContext } from "@ui/notification/hooks/NotificationProvider";
import NotificationType from "@ui/notification/interfaces/NotificationType";
import handleError from "@lib/util/error/handleError";
import handleUpdateInvoice from "@lib/controllers/invoice/handleUpdate";

export const InvoicePopupContext = createContext({} as IInvoicePopupContext)

const columnsFields = ["name", "lastname"]

interface InvoicePopupProviderProps {
  children: ReactNode,
  data: {
    invoicePopupMode: INVOICE_POPUP_MODE,
    invoiceData: InvoiceDocument | null,
    onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE | null>>,
  }
}

export default function InvoicePopupProvider({ children, data }: InvoicePopupProviderProps) {
  const { invoicePopupMode, invoiceData, onChangePopupMode } = data
  const { user } = useContext(SessionContext)
  const [isVisiblePersonPopup, setIsVisiblePersonPopup] = useState<boolean>(false)
  const [isVisibleStatusPopup, setIsVisibleStatusPopup] = useState<boolean>(false)
  const [clients, setClients] = useState<PersonDocument[]>([])
  const [filterClient, setFilterClient] = useState<string | null>(null)
  const [invoiceProducts, setInvoiceProducts] = useState<Map<string, MappedObject> | null>(
    invoicePopupMode === INVOICE_POPUP_MODE.EDIT ? null : new Map()
  )
  const [errors, setErrors] = useState<Map<string, any>>(new Map())
  const [invoice, setInvoice] = useState<InvoiceDocument>({ 
    __v: 0,
    _id: { $oid: invoiceData?._id.$oid || "" },
    isDeleted: invoiceData?.isDeleted || false,
    migrated: invoiceData?.migrated || false,
    status: invoiceData?.status || undefined,
    date: invoiceData?.date || formatDate(getDateTime()),
    value: invoiceData?.value || 0,
    type: invoiceData?.type || InvoiceType.SALE,
    isPaid: invoiceData?.isPaid !== undefined ? invoiceData?.isPaid : true,
    userId: invoiceData?.userId || user.id,
    user: {
      name: invoiceData?.user?.name || user.name,
      lastname: invoiceData?.user?.lastname || user.lastname
    },
  })
  
  const { handleAddNotification } = useContext(NotificationContext)

  const fetchClients = useCallback(async () => {
    const result = await getClients(filterClient ? getDatabaseFilterObject(columnsFields, filterClient) : {})
    setClients(result.data)
  }, [filterClient])

  const fetchInvoiceProducts = useCallback(async (invoiceId: string) => {
    setInvoiceProducts(mapData((await getInvoiceProductsByInvoiceId(invoiceId))?.data))
  }, [])

  useEffect(() => {
    if (invoiceData?.person && invoiceData.personId) {
      setInvoice((prevInvoice) => {
        return {
          ...prevInvoice,
          person: invoiceData.person,
          personId: invoiceData.personId
        }
      })
    }
  }, [setInvoice, invoiceData])

  useEffect(() => {
    if (invoiceData) fetchInvoiceProducts(invoiceData._id.$oid)
  }, [fetchInvoiceProducts, invoiceData])

  useEffect(() => {
    setErrors((prevErrors) => {
      if (invoice.status === INVOICE_STATUS.CREATED) return new Map(prevErrors)
      return new Map(prevErrors).set("totalValue", invoice.value <= 0)
    })
  }, [invoice.value, invoice.status])

  useEffect(() => {
    if (isVisiblePersonPopup) fetchClients()
  }, [filterClient, isVisiblePersonPopup, fetchClients, clients.length])

  const handleIsVisiblePersonPopup = () => {  
    setIsVisiblePersonPopup(!isVisiblePersonPopup)
  }
  
  const handleIsVisibleStatusPopup = () => {
    setIsVisibleStatusPopup(!isVisibleStatusPopup)
  }
  
  const handleInputChange = (name: string, value: any) => {
    setInvoice((prevInvoice) => { 
      return { ...prevInvoice, [name]: value }
    })
  }

  const handleInputClientChange = (
    value: {
      _id: { '$oid': string }
      name: string,
      lastname: string
    } | null
  ) => {
    if (value) {
      handleInputChange("person", { name: value.name, lastname: value.lastname })
      handleInputChange("personId", value._id.$oid)
    } else {
      handleInputChange("person", null)
      handleInputChange("personId", null)
    }
  }

  const handleInputStatusChange = (status: INVOICE_STATUS) => {
    if (invoice.status === status) return

    if ([INVOICE_STATUS.PAID, INVOICE_STATUS.DEBT].includes(status)) {
      handleInputChange("isPaid", status === "Pagada")
    }
    
    if (invoice.migrated && INVOICE_STATUS.CREATED ) {
      // TODO: make advice that says: "No es posible cambiar el estado de la factura a "Creada" si esta ya fue migrada."
      return
    } 
    
    if (invoice.status === INVOICE_STATUS.CREATED) delete invoice.status

    setErrors(new Map(errors).set("totalValue", status !== "Creada"))
    handleInputChange("status", status)
  }

  const handleInputClientFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterClient(e.target.value)
  }

  const handleSave = async () => {
    if (invoicePopupMode === INVOICE_POPUP_MODE.CREATE) {
      try {
        await handleSaveInvoice(invoice, invoiceProducts || new Map())
        handleAddNotification ({ 
          title: "Factura",
          text: `La factura fue guardada exitosamente.`,
          type: NotificationType.OK
        })
      } catch (error) {
        handleError(error)
        handleAddNotification({ 
          title: "Factura",
          text: `La factura no pudo ser guardada.`,
          type: NotificationType.ERROR
        })
      }
    } else {
      try {
        await handleUpdateInvoice(invoice, invoiceProducts || new Map())
      } catch (error) {
        
      }
    }
    onChangePopupMode(null)
  }

  return (
    <InvoicePopupContext.Provider value={{
      isVisiblePersonPopup,
      setIsVisiblePersonPopup,
      isVisibleStatusPopup,
      setIsVisibleStatusPopup,
      clients,
      setClients,
      filterClient,
      setFilterClient,
      invoiceProducts,
      setInvoiceProducts,
      errors,
      setErrors,
      invoice,
      setInvoice,
      onChangePopupMode,
      invoicePopupMode,
      handleInputChange,
      handleInputClientChange,
      handleInputClientFilterChange,
      handleIsVisiblePersonPopup,
      handleIsVisibleStatusPopup,
      handleInputStatusChange,
      handleSave
    }}>
      { children }
    </InvoicePopupContext.Provider>
  )
}