'use client'

import { InvoiceDocument, InvoiceType } from "@lib/db/schemas/invoice/Invoice"
import getInvoices from "@lib/services/invoice/getInvoices"
import SearchIcon from "@public/dashboard/search.svg"
import Input from "@ui/core/components/Input"
import Spin from "@ui/core/components/Spin"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { MappedObject } from "@ui/table/interfaces/Row"
import { TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { useCallback, useEffect, useRef, useState } from "react"
import InvoicePopup from "@ui/sales/containers/InvoicePopup"
import INVOICE_POPUP_MODE from "@ui/sales/constants/InvoicePopupMode"
import SALES_TABLE_COLUMNS from "@ui/sales/constants/SalesTableColumns"
import InvoiceDeletePopup from "@ui/sales/containers/InvoiceDeletePopup"

export default function Sales() {
  const [data, setData] = useState<Map<string, MappedObject> | null>(null)
  const [filters, setFilters] = useState<Partial<InvoiceDocument>>({})
  const [sort, setSort] = useState()
  const [invoicePopupMode, setInvoicePopupMode] = useState<INVOICE_POPUP_MODE | null>(null)
  const [invoiceToEdit, setInvoiceToEdit] = useState<InvoiceDocument | null>(null)
  const [invoicesToDelete, setInvoicesToDelete] = useState<string[] | null>(null)

  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)

  const fetchData = useCallback(async () => {
    if (invoicePopupMode !== null) return
    const result = await getInvoices(
      {
        type: InvoiceType.SALE, 
        isDeleted: false,
        ...filters 
      }, 
      pageSelected
    )
    pagesNumber.current = result.pages_number
    setData(mapData(result.data)) 
  }, [filters, pageSelected, setData, invoicePopupMode])

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
        (
          invoicePopupMode !== null 
            && [INVOICE_POPUP_MODE.CREATE, INVOICE_POPUP_MODE.EDIT].includes(invoicePopupMode)
        ) &&
          <InvoicePopup 
            invoicePopupMode={invoicePopupMode}
            onChangePopupMode={setInvoicePopupMode}  
            invoiceData={invoiceToEdit}
          /> 
      }
      {
        (invoicePopupMode !== null && invoicePopupMode === INVOICE_POPUP_MODE.DELETE) &&
          <InvoiceDeletePopup 
            onChangePopupMode={setInvoicePopupMode} 
            invoicesToDelete={invoicesToDelete || []}
          />
      }
      <div className="flex flex-row mb-[40px]">
        <Input 
          type="text" 
          name="search_invoice" 
          value="" 
          onChange={() => {}} 
          placeholder="Buscar..." 
          className="
            h-[40px]
            w-[450px]
            bg-[#F4F4F4]
            placeholder-[#7A7A7A]
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
          "
          styles={{
            fontSize: '16px',
            userSelect: "none"
          }}
          image={{
            alt: 'search_icon',
            src: SearchIcon.src,
            height: 24,
            width: 24
          }}
        /> 
        <span className="ms-[24px]">{ data ? data.size : <Spin size={9} className="!me-1" /> } elemento{ !data || data.size > 1 ? "s" : "" } • Ordenado por Fecha de venta • Filtrado por “Ejemplo”</span>
      </div>
      <DynamicTable 
        config={tableConfig}
        initialData={data} 
        pageSelected={pageSelected} 
        pagesNumber={pagesNumber}   
        setPageSelected={setPageSelected}   
      />
    </>
  )
}
