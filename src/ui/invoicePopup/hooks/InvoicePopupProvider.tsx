import { ChangeEvent, createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useEffect, useRef, useState } from "react";
import IInvoicePopupContext from "../interfaces/InvoicePopupContext";
import { SessionContext } from "@ui/session/hooks/SessionProvider";
import { PersonDocument } from "@lib/db/schemas/person/Person";
import INVOICE_POPUP_MODE from "../constants/InvoicePopupMode";
import { MappedObject } from "@ui/table/interfaces/Row";
import { Invoice, InvoiceDocument, INVOICE_TYPE } from "@lib/db/schemas/invoice/Invoice";
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus";
import mapData from "@ui/table/util/mapData";
import getInvoiceProductsByInvoiceId from "@lib/services/invoiceProduct/getInvoiceProductsByInvoiceId";
import getDatabaseFilterObject from "@ui/core/util/getDatabaseFilterObject";
import getClients from "@lib/services/client/getClients";
import handleSaveInvoice from "@lib/controllers/invoice/handleSaveInvoice";
import { NotificationContext } from "@ui/notification/hooks/NotificationProvider";
import NotificationType from "@ui/notification/interfaces/NotificationType";
import handleError from "@lib/util/error/handleError";
import handleUpdateInvoice from "@lib/controllers/invoice/handleUpdateInvoice";
import useInvoiceWarnings, { INVOICE_WARNINGS, Warning } from "./useInvoiceWarnings" ;
import getInvoiceProductsToUpdate from "@lib/services/invoiceProduct/util/getInoviceProductsToUpdate";
import getInitialInvoice from "../util/getInitialInvoice";

export const InvoicePopupContext = createContext({} as IInvoicePopupContext)

const columnsFields = ["name", "lastname"]

interface InvoicePopupProviderProps {
  children: ReactNode,
  data: {
    invoicePopupMode: INVOICE_POPUP_MODE.CREATE | INVOICE_POPUP_MODE.EDIT,
    invoiceData: InvoiceDocument | null,
    invoiceType: INVOICE_TYPE,
    onChangePopupMode: Dispatch<SetStateAction<INVOICE_POPUP_MODE>>,
  }
}

export default function InvoicePopupProvider({ children, data }: InvoicePopupProviderProps) {
  const { invoicePopupMode, invoiceData, invoiceType, onChangePopupMode } = data
  
  const { user } = useContext(SessionContext)
  const { handleAddNotification } = useContext(NotificationContext)

  const { warnings, setWarnings } = useInvoiceWarnings()
  const [isVisiblePersonPopup, setIsVisiblePersonPopup] = useState<boolean>(false)
  const [isVisibleStatusPopup, setIsVisibleStatusPopup] = useState<boolean>(false)
  const [clients, setClients] = useState<PersonDocument[]>([])
  const [filterClient, setFilterClient] = useState<string | null>(null)
  const shouldSavePayment = useRef<boolean>(false)
  const shouldRestorePayments = useRef<boolean>(false)
  const [invoiceProducts, setInvoiceProducts] = useState<Map<string, MappedObject> | null>(
    invoicePopupMode === INVOICE_POPUP_MODE.EDIT ? null : new Map()
  )

  const getInitialInvoiceCallback = useCallback(
    () => getInitialInvoice(invoiceData, invoiceType, user), 
    [invoiceData, invoiceType, user]
  )

  const [invoice, setInvoice] = useState<InvoiceDocument>(getInitialInvoiceCallback())

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
    setWarnings((prevWarnings) => {
      const newMap = new Map(prevWarnings)
      const invoiceValueLowerZeroAndDifferenceCreated = invoice.value <= 0 && invoice.status !== INVOICE_STATUS.CREATED
      newMap.set(
        INVOICE_WARNINGS.TOTAL_INVOICE_IS_ZERO,
        { 
          isBlocking: invoiceValueLowerZeroAndDifferenceCreated, 
          isVisible: invoiceValueLowerZeroAndDifferenceCreated
        }
      )

      return newMap
    })
  }, [invoice.status, invoice.value, setWarnings])

  useEffect(() => {
    if (isVisiblePersonPopup) fetchClients()
  }, [filterClient, isVisiblePersonPopup, fetchClients])

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

  const handleIsVisibleInvoicePopup = (invoiceWarning: INVOICE_WARNINGS) => {
    const warning: Warning | undefined = warnings.get(invoiceWarning)
    if (warning) {
      setWarnings(
        new Map(warnings).set(
          invoiceWarning, 
          { ...warning, isVisible: !warning.isVisible }
        )
      )
    } else {
      setWarnings(
        new Map(warnings).set(
          invoiceWarning, 
          { isBlocking: [INVOICE_WARNINGS.TOTAL_INVOICE_IS_ZERO].includes(invoiceWarning), isVisible: true }
        )
      )
    }
  }

  const handleInputStatusChange = (newStatus: INVOICE_STATUS) => {
    const oldStatus = invoice.status
    if (oldStatus === newStatus) return
    if (oldStatus === INVOICE_STATUS.CREATED) delete invoice.status

    if (invoicePopupMode === INVOICE_POPUP_MODE.EDIT) {
      handleIsVisibleStatusPopup()
      if (invoice.migrated && newStatus === INVOICE_STATUS.CREATED) {
        return handleIsVisibleInvoicePopup(INVOICE_WARNINGS.INVOICE_MIGRATED_CANT_CHANGE_TO_CREATED)
      } 
  
      if (newStatus === INVOICE_STATUS.CREATED) {
        return handleIsVisibleInvoicePopup(INVOICE_WARNINGS.DELETE_PAYMENTS)
      }
  
      if (newStatus === INVOICE_STATUS.PAID && oldStatus === INVOICE_STATUS.DEBT) {
        return handleIsVisibleInvoicePopup(INVOICE_WARNINGS.SAVE_PAYMENT_QUESTION)
      }        
    }

    if ([INVOICE_STATUS.PAID, INVOICE_STATUS.DEBT].includes(newStatus)) {
      if (oldStatus === INVOICE_STATUS.CREATED && invoicePopupMode === INVOICE_POPUP_MODE.EDIT) {
        //TODO: Get payment and validate
        /*const payments = (await getPaymentsByInvoiceId(invoice._id.$oid, {})).data
        if (payments.find((payment) => payment.isDeleted === false)) {}*/

        return handleIsVisibleInvoicePopup(INVOICE_WARNINGS.RESTAURE_PAYMENTS)
      }
      handleInputChange("isPaid", newStatus === "Pagada")
    }

    handleInputChange("status", newStatus)
  }

  const handleInputClientFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterClient(e.target.value)
  }

  const handleSave = async () => {
    const invoiceOperations = {
      [INVOICE_POPUP_MODE.CREATE]: async () => {
        type InvoiceWithoutId = Omit<InvoiceDocument, "_id"> & { _id?: { $oid: string } }
        const invoiceWithoutId: InvoiceWithoutId = invoice
        // It's necessary delete the ID because the save service returned a error if the id is void
        delete invoiceWithoutId._id
        await handleSaveInvoice(invoice as Invoice, invoiceProducts || new Map())
        return "La factura fue guardada exitosamente." 
      },

      [INVOICE_POPUP_MODE.EDIT]: async () => {
        await handleUpdateInvoice(
          { 
            invoice, 
            invoiceProducts: getInvoiceProductsToUpdate(invoice._id.$oid, invoiceProducts || new Map()),
            userId: user.id
          },
          { shouldSavePayment: shouldSavePayment.current, shouldRestorePayments: shouldRestorePayments.current}
        )
        return "Los cambios en la factura fueron guardados exitosamente." 
      }
    }

    try {  
      const message: string = await invoiceOperations[invoicePopupMode]()

      handleAddNotification ({ 
        title: "Factura",
        text: message,
        type: NotificationType.OK
      })
    } catch (error) {
      const message = handleError(error)
      handleAddNotification({ 
        title: "Factura",
        text: `La factura no pudo ser guardada.`,
        type: NotificationType.ERROR,
        showMore: <span>{ message }</span>
      })
    }
    onChangePopupMode(INVOICE_POPUP_MODE.NONE)
  }

  return (
    <InvoicePopupContext.Provider value={{
      invoiceType,
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
      warnings,
      setWarnings,
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
      handleSave,
      handleIsVisibleInvoicePopup,
      shouldSavePayment,
      shouldRestorePayments
    }}>
      { children }
    </InvoicePopupContext.Provider>
  )
}