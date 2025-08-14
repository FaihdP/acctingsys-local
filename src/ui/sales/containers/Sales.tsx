'use client'

import { InvoiceDocument, INVOICE_TYPE, Invoice } from "@lib/db/schemas/invoice/Invoice"
import getInvoices from "@lib/services/invoice/getInvoices"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { useCallback, useEffect, useRef, useState } from "react"
import INVOICE_POPUP_MODE from "@ui/invoicePopup/constants/InvoicePopupMode"
import SALES_TABLE_COLUMNS from "@ui/sales/constants/SalesTableColumns"
import InvoiceDeletePopup from "@ui/invoicePopup/containers/InvoiceDeletePopup"
import InvoiceSalePopup from "@ui/sales/containers/InvoiceSalePopup"
import InputSearchTable from "@ui/core/components/InputSearchTable"
import useDebounce from "@ui/core/hooks/useDebounce"
import getInvoiceMongoFilter from "@lib/services/invoice/util/getInvoiceMongoFilter"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import getMongoFilter from "@lib/util/getMongoFilter"

const DEFAULT_INVOICE_SALES_FILTER: Partial<Invoice> = {
  type: INVOICE_TYPE.SALE,
  isDeleted: false
}

export default function Sales() {
  const [salesInvoices, setSalesInvoices] = useState<Map<string, MappedObject> | null>(null)
  const [filter, setFilter] = useState<string>("")
  const [sort, setSort] = useState()
  const [invoicePopupMode, setInvoicePopupMode] = useState<INVOICE_POPUP_MODE>(INVOICE_POPUP_MODE.NONE)
  const [invoiceToEdit, setInvoiceToEdit] = useState<InvoiceDocument | null>(null)
  const [invoicesToDelete, setInvoicesToDelete] = useState<string[] | null>(null)
  const debouncedFilter = useDebounce(filter, DEBOUNCE_TIME)

  const [pageSelected, setPageSelected] = useState<number>(1)
  const totalRecords = useRef<number>(0)
  const pagesNumber = useRef<number>(1)

  const fetchInvoices = useCallback(async () => {
    const mongoFilter = getMongoFilter(
      debouncedFilter, 
      ["date", "value", "status"], 
      DEFAULT_INVOICE_SALES_FILTER, 
      ["person.name", "person.lastname", "_id.$oid"]
    )

    console.log(mongoFilter)

    let result = await getInvoices(mongoFilter, pageSelected)

    pagesNumber.current = result.pages_number
    totalRecords.current = result.total_records
    setSalesInvoices(mapData(result.data)) 
  }, [pageSelected, setSalesInvoices, debouncedFilter])

  useEffect(() => { 
    if (invoicePopupMode !== INVOICE_POPUP_MODE.NONE) return
    fetchInvoices() 
  }, [fetchInvoices, invoicePopupMode])

  const tableConfig: TableConfigProps = {
    modifiers: {
      onAddRow: async () => {
        setInvoiceToEdit(null)
        setInvoicePopupMode(INVOICE_POPUP_MODE.CREATE)
      },
      onEditRow: async (data: any) => {
        setInvoiceToEdit(data as InvoiceDocument)
        setInvoicePopupMode(INVOICE_POPUP_MODE.EDIT)
      },
      onDeleteRow: async (ids: string[]) => {
        if (ids.length > 0) {
          setInvoicesToDelete(ids)
          setInvoicePopupMode(INVOICE_POPUP_MODE.DELETE)
        }
      },
    },
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: SALES_TABLE_COLUMNS
    }
  }

  return (
    <>
      { 
        [INVOICE_POPUP_MODE.CREATE, INVOICE_POPUP_MODE.EDIT].includes(invoicePopupMode) &&
          <InvoiceSalePopup
            invoicePopupMode={invoicePopupMode as INVOICE_POPUP_MODE.CREATE | INVOICE_POPUP_MODE.EDIT}
            onChangePopupMode={setInvoicePopupMode}  
            invoiceData={invoiceToEdit}
          /> 
      }
      {
        invoicePopupMode === INVOICE_POPUP_MODE.DELETE &&
          <InvoiceDeletePopup 
            onChangePopupMode={setInvoicePopupMode} 
            invoicesToDelete={invoicesToDelete || []}
          />
      }
      <InputSearchTable 
        totalRecords={totalRecords.current}
        data={salesInvoices}
        filter={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <button onClick={async () => {
        let result = (await getInvoices({ _id: { $oid: "66cc0708b2ab4e96e4db6281" } })).data[0]
        const date: Date = (result as any).date1
        console.log(date)
      }}>
        Prueba
      </button>
      <DynamicTable 
        config={tableConfig}
        initialData={salesInvoices} 
        pageSelected={pageSelected} 
        pagesNumber={pagesNumber}   
        setPageSelected={setPageSelected}   
      />
    </>
  )
}
