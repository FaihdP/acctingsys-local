'use client'

import getInvoices from "@lib/services/invoice/getInvoices"
import TableProps, { ColumType } from "@ui/table/interfaces/Table"
import Table from "@ui/table/containers/Table"
import COLORS from "@ui/core/util/colors"

export default function Dashboard() {
  const tableConfig: TableProps["config"] = {
    modifiers: { onDeleteRow: async () => {} },
    actions: { onEdit: async () => {} },
    header: {
      picker: true, 
      options: {
        onEdit: true
      },
      columns: [
        { 
          label: "Fecha y hora",
          tag: "date",
          type: ColumType.DATE,
        },
        { 
          label: "Valor",
          tag: "value",
          type: ColumType.CURRENCY
        },
        // TODO: validate how show this object in a table
        { 
          label: "Cliente",
          tag: "person",
          type: ColumType.OBJECT
        },
        { 
          label: "Estado",
          tag: "status",
          type: ColumType.SELECT,
          relationship: new Map([
            ["Pagada", { background: COLORS.GREEN, fontColor: "#0D6948" }],
            ["En deuda", { background: "#FB8383", fontColor: "#922323" }]
          ])
        },
        { 
          label: "Usuario",
          tag: "user",
          type: ColumType.OBJECT
        },
        { 
          label: "Productos",
          tag: "productOverview",
          type: ColumType.LIST
        },
      ],
    }
  }

  return <>
    <Table 
      getData={getInvoices}
      config={tableConfig} 
    />
  </>
}