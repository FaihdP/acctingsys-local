import getUsers from "@lib/services/user/getUsers"
import { formatDate, getDateTime } from "@lib/util/time"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import CashPaymentTag from "../components/CashPaymentTag"

const PAYMENTS_TABLE_COLUMNS: TableConfigHeaderProps["columns"] = [
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
    width: 100,
    required: true
  },
  { 
    label: "Persona",
    tag: "personId",
    type: ColumType.TEXT,
  },
  { 
    label: "Factura",
    tag: "invoiceId",
    type: ColumType.TEXT,
  },
  { 
    type: ColumType.SELECT,
    label: "Tipo de pago",
    tag: "type",
    relationship: new Map([
      ["CASH", CashPaymentTag],
      //["Fisico", ]
    ]),
    minWidth: 80,
    required: true,
    defaultValue: "Fisico"
  },
  { 
    label: "Banco",
    tag: "bank",
    type: ColumType.TEXT,
  },
  { 
    label: "Usuario",
    tag: "user",
    type: ColumType.OBJECT,
    relationship: getUsers,
    fields: ["name", "lastname"],
    defaultValue: { name: "Faihd", lastname: "Pineda" }
  },
]

export default PAYMENTS_TABLE_COLUMNS