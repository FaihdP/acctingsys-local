'use client'

import Expense from "@lib/api/interfaces/Expense";
import Invoice from "@lib/api/interfaces/Invoice";
import Payment from "@lib/api/interfaces/Payment";
import saveExpenses, { ExpenseResponse } from "@lib/api/services/saveExpenses";
import saveInvoices, { InvoiceResponse } from "@lib/api/services/saveInvoices";
import savePayments, { PaymentResponse } from "@lib/api/services/savePayments";
import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration";
import MigrationExpense from "@lib/db/schemas/migration/MigrationExpense";
import MigrationInvoice from "@lib/db/schemas/migration/MigrationInvoice";
import MigrationPayment from "@lib/db/schemas/migration/MigrationPayment";
import getDocumentsToMigrate from "@lib/services/migration/getDocumentsToMigrate";
import getMigrations from "@lib/services/migration/getMigrations";
import saveMigration from "@lib/services/migration/saveMigration";
import updateMigration from "@lib/services/migration/updateMigration";
import saveMigrationExpense from "@lib/services/migrationExpense/saveMigrationExpense";
import saveMigrationInvoice from "@lib/services/migrationInvoice/saveMigrationInvoice";
import saveMigrationPayment from "@lib/services/migrationPayment/saveMigrationPayment";
import handleError from "@lib/util/error/handleError";
import { formatDate, getDateTime } from "@lib/util/time";
import MigrationIcon from "@public/dashboard/nav/MigrationIcon";
import { NotificationContext } from "@ui/notification/hooks/NotificationProvider";
import NotificationType from "@ui/notification/interfaces/NotificationType";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";

export const StartMigrationContext = createContext({} as { 
  startMigration: () => Promise<void>, 
  reloadComponent: boolean, 
})

export default function StartMigrationProvider({ children }: { children: ReactNode }) {
  const { setNotifications, handleAddNotification, handleUpdateNotification } = useContext(NotificationContext)
  const [tauriEvent, setTauriEvent] = useState<any>()
  const [reloadComponent, setReloadComponent] = useState(false)

  // This is a workaround to avoid the error: "Cannot read properties of undefined (reading window '__TAURI__')"
  const setupTauriEvent = async () => setTauriEvent(await import("@tauri-apps/api/event"))
  useEffect(() => { setupTauriEvent() }, [])

  const isOnline = async () => {
    try {
      await fetch("https://www.google.com", { method: "HEAD", mode: "no-cors" })
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const startMigration = useCallback(async () => {  
    const savePendingMigration = async () => {
      await saveMigration({
        date: formatDate(getDateTime()),
        status: MIGRATION_STATUS.PENDING,
        invoices: 0,
        payments: 0,
        expenses: 0,
      })
    }
  
    const handleOfflineMigration = async (existsPendingMigration: any) => {
      handleAddNotification({
        type: NotificationType.ERROR,
        title: "Migración fallida",
        text: "No es posible comenzar la migación debido a que no hay conexión a internet.",
      })
      
      if (!existsPendingMigration) {
        await savePendingMigration()
        // Validate connection during 10 minuts
      }
    }

    const getOrCreateMigration = async (existsPendingMigration: any, documentsToMigrate: any) => {
      const now = formatDate(getDateTime())
      if (existsPendingMigration) {
        const migrationId = existsPendingMigration._id?.$oid
        await updateMigration(migrationId, { $set: { status: MIGRATION_STATUS.PROCESSING, startDate: now} })
        return migrationId
      }

      const newMigration = await saveMigration({
        date: now,
        startDate: now,
        invoices: documentsToMigrate.invoices.length,
        payments: documentsToMigrate.payments.length,
        expenses: documentsToMigrate.expenses.length,
        status: MIGRATION_STATUS.PROCESSING,
      })
      return newMigration.insertedIds[0].$oid
    }

    const handleAndNotifyIfNoDocumentsToMigrate = (notificationId: string) => {
      setNotifications((prev) => {
        const newMapNotifications = new Map(prev)
        newMapNotifications.set(notificationId, {
          type: NotificationType.INFO,
          title: "Fin de migración",	
          text: "No se encontro ningún documento para migrar.",
        })
        return newMapNotifications
      })
    }

    const saveDocumentsAPI = async (documents: any) => {
      const { invoices, payments, expenses } = documents
      const paymentsResponse = await savePayments(payments)
      const invoicesResponse = await saveInvoices(invoices)
      const expensesResponse = await saveExpenses(expenses)
      return { invoicesResponse, paymentsResponse, expensesResponse }
    }

    const handleProcessInvoiceResponse = async (invoicesResponse: InvoiceResponse[], invoicesToMigrate: Invoice[]) => {
      let invoicesResponseWithError = 0
      const migrationInvoices: MigrationInvoice[] = []

      for (const invoiceResponse of invoicesResponse) {
        const invoice = invoicesToMigrate.find((invoice) => invoice.InvoiceID === invoiceResponse.InvoiceID)
        const isOk = invoiceResponse.statusCode === 200

        if (!isOk) invoicesResponseWithError++
        //else await updateInvoice(invoiceResponse.InvoiceID, { $set: { migrated: true } })

        migrationInvoices.push({
          migrationId,
          invoiceId: invoiceResponse.InvoiceID,
          migrated: isOk,
          error: !isOk ? invoiceResponse.message : undefined,
          date: formatDate(getDateTime()),
          value: invoice?.value,
          type: invoice?.type,
          status: invoice?.status
        } as MigrationInvoice)
      }

      return { invoicesResponseWithError, migrationInvoices }
    }

    const handleProcessPaymentResponse = async (paymentsResponse: PaymentResponse[], paymentsToMigrate: Payment[]) => {
      let paymentsResponseWithError = 0
      const migrationPayments: MigrationPayment[] = []
      
      for (const paymentResponse of paymentsResponse) {
        const payment = paymentsToMigrate.find((payment) => payment.PaymentID === paymentResponse.PaymentID)
        const isOk = paymentResponse.statusCode === 200

        if (!isOk) paymentsResponseWithError++
        //else await updatePayment(paymentResponse.PaymentID, { $set: { migrated: true } })
        
        migrationPayments.push({
          migrationId,
          paymentId: paymentResponse.PaymentID,
          migrated: isOk,
          error: paymentResponse.statusCode !== 200 ? paymentResponse.message : undefined,
          date: formatDate(getDateTime()),
          value: payment?.value,
          type: payment?.type,
        } as MigrationPayment)
      }

      return { paymentsResponseWithError, migrationPayments }
    }

    const handleProcessExpensesResponse = async (expensesResponse: ExpenseResponse[], expensesToMigrate: Expense[]) => {
      let expensesResponseWithError = 0
      const migrationExpenses: MigrationExpense[] = []
      
      for (const expenseResponse of expensesResponse) {
        const expense = expensesToMigrate.find((expense) => expense.ExpenseID === expenseResponse.ExpenseID)
        const isOk = expenseResponse.statusCode === 200

        if (!isOk) expensesResponseWithError++
        //else await updateExpense

        migrationExpenses.push({
          migrationId,
          expenseId: expenseResponse.ExpenseID,
          migrated: isOk,
          error: expenseResponse.statusCode !== 200 ? expenseResponse.message : undefined,
          date: formatDate(getDateTime()),
          value: expense?.value,
          title: expense?.title,
          description: expense?.description
        } as MigrationExpense)
      }

      return { expensesResponseWithError, migrationExpenses }
    }

    const handleProcessDocumentsResponse = async (documentsToMigrate: any, documentsResponse: any) => {
      if (!documentsResponse) return
      const { invoices, payments, expenses } = documentsToMigrate
      const { invoicesResponse, paymentsResponse, expensesResponse } = documentsResponse

      const { invoicesResponseWithError, migrationInvoices } = await handleProcessInvoiceResponse(invoicesResponse, invoices)
      const { paymentsResponseWithError, migrationPayments } = await handleProcessPaymentResponse(paymentsResponse, payments)
      const { expensesResponseWithError, migrationExpenses } = await handleProcessExpensesResponse(expensesResponse, expenses)

      return {
        invoicesResponseWithError,
        migrationInvoices,
        paymentsResponseWithError,
        migrationPayments,
        expensesResponseWithError,
        migrationExpenses
      }
    }

    const handleUpdateMigrationNotification = (
      notificationId: string, 
      documentsResponseToSave: any,
      existsSomeDocumentWithError: boolean,
      newMigrationStatus: MIGRATION_STATUS
    ) => {
      const { 
        migrationInvoices, invoicesResponseWithError, 
        migrationPayments, paymentsResponseWithError, 
        migrationExpenses, expensesResponseWithError
      } = documentsResponseToSave

      let notificationType = NotificationType.OK
      if (newMigrationStatus === MIGRATION_STATUS.UNCOMPLETED) {
        notificationType = NotificationType.INPROCCESS
      }

      // TODO: Improve this to display differents notifications types according to the number of documents with error
      handleUpdateNotification(
        notificationId, 
        {
          type: notificationType,
          title: "Migración completada",	
          text: "El proceso de migración se ha completado exitosamente.",
          showMore: 
            <div className="flex flex-col mt-2">
              <b>Documentos migrados correctamente</b>
              <span>{migrationInvoices.length - invoicesResponseWithError} facturas</span>
              <span>{migrationPayments.length - paymentsResponseWithError} pagos</span>
              <span>{migrationExpenses.length - expensesResponseWithError} gastos</span>
              { 
                existsSomeDocumentWithError && 
                  <>
                    <b>Documentos no migrados</b>
                    {invoicesResponseWithError > 0 && <span>{invoicesResponseWithError} facturas</span>}
                    {paymentsResponseWithError > 0 && <span>{paymentsResponseWithError} pagos</span>}
                    {expensesResponseWithError > 0 && <span>{expensesResponseWithError} gastos</span>}
                  </>
              }
            </div>
        }
      )
    }

    const updateMigrationStatus = async (documentsResponseToSave: any, existsSomeDocumentWithError: boolean) => {
      const { 
        migrationInvoices, invoicesResponseWithError, 
        migrationPayments, paymentsResponseWithError, 
        migrationExpenses, expensesResponseWithError
      } = documentsResponseToSave

      let newMigrationStatus = MIGRATION_STATUS.COMPLETED
      if (existsSomeDocumentWithError) {
        const isCompleteFailure = 
          invoicesResponseWithError === migrationInvoices.length
          && paymentsResponseWithError === migrationPayments.length
          && expensesResponseWithError === migrationExpenses.length
        
        newMigrationStatus = isCompleteFailure 
          ? MIGRATION_STATUS.FAILED 
          : MIGRATION_STATUS.UNCOMPLETED
      }

      await updateMigration(migrationId, { $set: { status: newMigrationStatus } })
      return newMigrationStatus
    }

    const handleErrorAndUpdateNotification = async (notificationId: string, error: any) => {
      await updateMigration(migrationId, { $set: { status: MIGRATION_STATUS.FAILED } })
      handleUpdateNotification(
        notificationId, 
        {
          type: NotificationType.ERROR,
          title: "Error de migración",	
          text: "Hubo un error al completar el proceso de migración.",
          showMore: 
            <div>
              <b>ERROR</b>
              <div className="bg-[#f1dce2] rounded font-mono p-1 px-2">
                { (error as Error).message }
              </div>
            </div>
        }
      )
      throw handleError(error)
    }

    const existsPendingMigration = (await getMigrations({ status: MIGRATION_STATUS.PENDING })).data[0]
    const existsInProcessMigration = (await getMigrations({ status: MIGRATION_STATUS.PROCESSING })).data[0]

    console.log("existsPendingMigration", existsPendingMigration)
    console.log("existsInProcessMigration", existsInProcessMigration)

    if (!(await isOnline())) return await handleOfflineMigration(existsPendingMigration)
    
    if (existsInProcessMigration) {
      if (!existsPendingMigration) savePendingMigration()
      return
    }

    const notificationId = handleAddNotification({
      type: NotificationType.INPROCCESS,
      title: "Incio de migración", 
      text: "Ha comenzado el proceso de migración.",
    })

    const documentsToMigrate = await getDocumentsToMigrate()
    const { invoices, payments, expenses } = documentsToMigrate

    console.log("invoices", invoices)
    console.log("payments", payments)
    console.log("expenses", expenses)

    const migrationId: string = await getOrCreateMigration(existsPendingMigration, documentsToMigrate)
    
    console.log("migrationId", migrationId)

    if (invoices.length === 0 && payments.length === 0 && expenses.length === 0) {
      return handleAndNotifyIfNoDocumentsToMigrate(notificationId)
    }

    let documentsResponse;
    try {
      //documentsResponse = await saveDocumentsAPI(documentsToMigrate)
    } catch (error) {
      console.log(error)
      return await handleErrorAndUpdateNotification(notificationId, new Error(String(error)))
    }

    console.log("documentsResponse", documentsResponse)

    try {
        
      const documentsResponseToSave = await handleProcessDocumentsResponse(documentsToMigrate, documentsResponse)
      if (!documentsResponseToSave) throw new Error("No se pudo procesar los documentos")
      const { 
        migrationInvoices, invoicesResponseWithError, 
        migrationPayments, paymentsResponseWithError, 
        migrationExpenses, expensesResponseWithError
      } = documentsResponseToSave

      const existsSomeDocumentWithError = [
        invoicesResponseWithError,
        paymentsResponseWithError,
        expensesResponseWithError
      ].some((exists) => exists > 0)

      console.log(migrationInvoices)
      console.log(migrationPayments)
      console.log(migrationExpenses)

      // Update documents
      await saveMigrationInvoice(migrationInvoices)
      await saveMigrationPayment(migrationPayments) 
      await saveMigrationExpense(migrationExpenses)

      const newMigrationStatus = await updateMigrationStatus(documentsResponseToSave, existsSomeDocumentWithError)
      
      handleUpdateMigrationNotification(
        notificationId, 
        documentsResponseToSave, 
        existsSomeDocumentWithError,
        newMigrationStatus
      )

    } catch (error) {
      await handleErrorAndUpdateNotification(notificationId, error)
    }
  }, [handleAddNotification, handleUpdateNotification, setNotifications])

  useEffect(() => {
    let unlisten: (() => void) | undefined;
    
    if (tauriEvent) {
      const startMigrationExecute = async () => {
        unlisten = await tauriEvent.listen("start_migration", async () => {
          try {
            console.log("executeMigration")
            await startMigration()
          } catch (error) {
            console.log(error)
          } finally {
            setReloadComponent((prev) => !prev)
          }
        })
      }
      startMigrationExecute()
    }
    
    return () => unlisten?.();
  }, [startMigration, tauriEvent])

  return (
    <StartMigrationContext.Provider value={{
      startMigration,
      reloadComponent
    }}>
      { children }
    </StartMigrationContext.Provider>
  )
}