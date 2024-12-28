'use client'

import getInvoices from "@lib/services/invoice/getInvoices"
import { ColumType, TableConfigProps } from "@ui/table/interfaces/Table"
import COLORS from "@ui/core/util/colors"
import saveInvoices from "@lib/services/invoice/saveInvoices"
import getUsers from "@lib/services/user/getUsers"
import getProductOverview from "@lib/services/invoice/getProductInvoicesByInvoiceId"
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
      onDelete: deleteInvoices
    },
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: [
        { 
          type: ColumType.DATE,
          label: "Fecha y hora",
          tag: "date",
          minWidth: 160,
          autocomplete: false,
          required: true,
          defaultValue: () => formatDate(getDateTime())
        },
        { 
          label: "Valor",
          tag: "value",
          type: ColumType.CURRENCY,
          //minWidth: 80,
          width: 100,
          required: true
        },
        { 
          label: "Cliente",
          tag: "person",
          type: ColumType.OBJECT,
          relationship: async () => {return { data: [] }},
          fields: ['name', 'lastname'],
        },
        { 
          type: ColumType.SELECT,
          label: "Estado",
          tag: "status",
          relationship: new Map([
            ["Pagada", { background: COLORS.GREEN, fontColor: "#0D6948" }],
            ["En deuda", { background: "#FB8383", fontColor: "#922323" }],
            ["Creada", { background: "#8490FF", fontColor: "#1A29AE" }],
          ]),
          minWidth: 80,
          required: true,
          defaultValue: "Creada"
        },
        { 
          label: "Usuario",
          tag: "user",
          type: ColumType.OBJECT,
          relationship: getUsers,
          fields: ["name", "lastname"],
          defaultValue: { name: "Faihd", lastname: "Pineda" }
        },
        { 
          label: "Productos",
          tag: "productOverview",
          type: ColumType.LIST,
          width: 400,
          relationship: getProductOverview
        },
      ],
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