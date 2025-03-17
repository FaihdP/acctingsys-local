'use client'

import getInvoices from "@lib/services/invoice/getInvoices"
import { ColumType, TableConfigProps } from "@ui/table/interfaces/Table"
import COLORS from "@ui/core/util/colors"
import saveInvoices from "@lib/services/invoice/saveInvoices"
import getUsers from "@lib/services/user/getUsers"
import getProductOverviewByInvoiceId from "@lib/services/invoice/getProductOverviewByInvoiceId"
import Input from "@ui/core/components/Input"
import SearchIcon from "@public/dashboard/search.svg"
import deleteInvoices from "@lib/services/invoice/deleteInvoices"
import { formatDate, getDateTime } from "@lib/util/time"
import { useCallback, useEffect, useRef, useState } from "react"
import { InvoiceDocument } from "@lib/db/schemas/invoice/Invoice"
import { MappedObject } from "@ui/table/interfaces/Row"
import mapData from "@ui/table/util/mapData"
import DynamicTable from "@ui/table/containers/DynamicTable"
import Spin from "@ui/core/components/Spin"
import SALES_TABLE_COLUMNS from "@ui/sales/constants/SalesTableColumns"

export default function TableExample() {
  const [data, setData] = useState<Map<string, MappedObject> | null>(null)
  
  const [filters, setFilters] = useState<Partial<InvoiceDocument>>({})
  const [sort, setSort] = useState()

  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)

  const fetchData = useCallback(async () => {
    const result = await getInvoices(filters, pageSelected)
    pagesNumber.current = result.pages_number
    setData(mapData(result.data)) 
  }, [filters, pageSelected, setData])

  useEffect(() => { fetchData() }, [fetchData])

  const tableConfig: TableConfigProps = {
    modifiers: {},
    actions: { 
      onEdit: async () => {}, 
      onAdd: saveInvoices, 
    },
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: SALES_TABLE_COLUMNS,
    }
  }

  return <>
    <div className="flex">
      <Input 
        type="text" 
        name="search_invoice" 
        value="" 
        onChange={() => {}} 
        placeholder="Buscar..." 
        className="
          bg-[#F4F4F4]
          h-[40px]
          w-[450px]
          mb-[40px]
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
      <span className="ms-[24px]">
        { data ? data.size : <Spin size={9} className="me-0" /> } elemento{ !data || data.size > 1 ? "s" : "" } • Ordenado por Fecha de venta • Filtrado por “Ejemplo”
      </span>
    </div>
    <DynamicTable
      config={tableConfig} 
      initialData={data}
      pageSelected={pageSelected}
      setPageSelected={setPageSelected}
      pagesNumber={pagesNumber}
    />
  </>
}