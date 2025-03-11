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
import getInvoiceFilter from "@lib/services/invoice/util/getInvoiceFilter"

export default function Sales() {
  const [salesInvoices, setSalesInvoices] = useState<Map<string, MappedObject> | null>(null)
  const [filters, setFilters] = useState<string>("")
  const [sort, setSort] = useState()
  const [invoicePopupMode, setInvoicePopupMode] = useState<INVOICE_POPUP_MODE>(INVOICE_POPUP_MODE.NONE)
  const [invoiceToEdit, setInvoiceToEdit] = useState<InvoiceDocument | null>(null)
  const [invoicesToDelete, setInvoicesToDelete] = useState<string[] | null>(null)

  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)

  const fetchData = useCallback(async () => {
    if (invoicePopupMode !== INVOICE_POPUP_MODE.NONE) return
    const result = await getInvoices(
      getInvoiceFilter(filters), 
      pageSelected
    )
    pagesNumber.current = result.pages_number
    console.log(result)
    setSalesInvoices(mapData(result.data)) 
  }, [filters, pageSelected, setSalesInvoices, invoicePopupMode])

  useEffect(() => { fetchData() }, [fetchData])

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
            invoicePopupMode={invoicePopupMode}
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
        data={salesInvoices}
        filter={filters}
        onChange={(e) => setFilters(e.target.value)}
      />
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
