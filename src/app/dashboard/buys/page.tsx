'use client'

import { Invoice, INVOICE_TYPE, InvoiceDocument } from "@lib/db/schemas/invoice/Invoice"
import getInvoices from "@lib/services/invoice/getInvoices"
import getInvoiceMongoFilter from "@lib/services/invoice/util/getInvoiceMongoFilter"
import InvoiceBuyPopup from "@ui/buys/containers/InvoiceBuyPopup"
import InputSearchTable from "@ui/core/components/InputSearchTable"
import DEBOUNCE_TIME from "@ui/core/constants/DebounceTime"
import useDebounce from "@ui/core/hooks/useDebounce"
import INVOICE_POPUP_MODE from "@ui/invoicePopup/constants/InvoicePopupMode"
import InvoiceDeletePopup from "@ui/invoicePopup/containers/InvoiceDeletePopup"
import BUYS_TABLE_COLUMNS from "@ui/sales/constants/SalesTableColumns"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { useCallback, useEffect, useRef, useState } from "react"

const DEFAULT_INVOICE_BUYS_FILTER: Partial<Invoice> = {
  type: INVOICE_TYPE.BUY,
  isDeleted: false
}

export default function Buys() {
  const [buysInvoices, setBuysInvoices] = useState<Map<string, MappedObject> | null>(null)
  const [filter, setFilter] = useState<string>("")
  const [sort, setSort] = useState()
  const [invoicePopupMode, setInvoicePopupMode] = useState<INVOICE_POPUP_MODE>(INVOICE_POPUP_MODE.NONE)
  const [invoiceToEdit, setInvoiceToEdit] = useState<InvoiceDocument | null>(null)
  const [invoicesToDelete, setInvoicesToDelete] = useState<string[]>([])
  const debouncedFilter = useDebounce(filter, DEBOUNCE_TIME)

  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)

  const fetchInvoices = useCallback(async () => {
    let result;
    result = await getInvoices(
      debouncedFilter ? getInvoiceMongoFilter(debouncedFilter, DEFAULT_INVOICE_BUYS_FILTER) : DEFAULT_INVOICE_BUYS_FILTER, 
      pageSelected
    )

    pagesNumber.current = result.pages_number
    setBuysInvoices(mapData(result.data)) 
  }, [pageSelected, debouncedFilter])
  

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
      columns: BUYS_TABLE_COLUMNS
    }
  }

  return (
    <>
      { 
        [INVOICE_POPUP_MODE.CREATE, INVOICE_POPUP_MODE.EDIT].includes(invoicePopupMode) &&
          <InvoiceBuyPopup
            invoicePopupMode={invoicePopupMode}
            onChangePopupMode={setInvoicePopupMode}  
            invoiceData={invoiceToEdit}
          /> 
      }
      {
        invoicePopupMode === INVOICE_POPUP_MODE.DELETE &&
          <InvoiceDeletePopup 
            onChangePopupMode={setInvoicePopupMode} 
            invoicesToDelete={invoicesToDelete}
          />
      }
      <InputSearchTable 
        data={buysInvoices}
        filter={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <DynamicTable 
        config={tableConfig}
        initialData={buysInvoices} 
        pageSelected={pageSelected} 
        pagesNumber={pagesNumber}   
        setPageSelected={setPageSelected}   
      />
    </>
  )
}
