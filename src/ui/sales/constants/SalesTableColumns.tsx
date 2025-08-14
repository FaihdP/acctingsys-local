import getProductInvoicesByInvoiceId from "@lib/services/invoice/getProductOverviewByInvoiceId"
import getUsers from "@lib/services/user/getUsers"
import { formatDate, getDateTime } from "@lib/util/time"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"
import withStatus from "../components/withStatus"
import InvoiceStatusTagTable from "../components/InvoiceStatusTagTable"

const SALES_TABLE_COLUMNS: TableConfigHeaderProps["columns"] = [
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
      [INVOICE_STATUS.CREATED, withStatus(InvoiceStatusTagTable, INVOICE_STATUS.CREATED)],
      [INVOICE_STATUS.DEBT, withStatus(InvoiceStatusTagTable, INVOICE_STATUS.DEBT)],
      [INVOICE_STATUS.PAID, withStatus(InvoiceStatusTagTable, INVOICE_STATUS.PAID)],
    ]), 
    minWidth: 80,
    required: true,
    defaultValue: "Creada"
  },
  { 
    label: "Usuario",
    tag: "user",
    type: ColumType.OBJECT,
    relationship: async () => ({ data: [] }),
    fields: ["name", "lastname"],
    defaultValue: { name: "Faihd", lastname: "Pineda" }
  },
  { 
    label: "Productos",
    tag: "productOverview",
    type: ColumType.LIST,
    width: 400,
    relationship: async () => {}
  },
]

export default SALES_TABLE_COLUMNS