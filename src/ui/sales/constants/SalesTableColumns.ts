import getProductInvoicesByInvoiceId from "@lib/services/invoice/getProductOverviewByInvoiceId"
import getUsers from "@lib/services/user/getUsers"
import { formatDate, getDateTime } from "@lib/util/time"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import INVOICE_STATUS_COLORS from "../../core/constants/InvoiceStatusColors"

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
    relationship: new Map(Object.entries(INVOICE_STATUS_COLORS)),
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
    relationship: getProductInvoicesByInvoiceId
  },
]

export default SALES_TABLE_COLUMNS