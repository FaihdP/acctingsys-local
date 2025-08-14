import getUsers from "@lib/services/user/getUsers"
import { formatDate, getDateTime } from "@lib/util/time"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import withPaymentType from "../components/withPaymentType"
import PaymetTypeTagTable from "../components/PaymentTypeTagTable"
import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment"
import validateInvoiceValue from "@lib/services/payment/util/validateInvoiceValue"
import getBanks from "@lib/services/bank/getBanks"
import getInvoiceList from "@lib/services/invoice/getInvoicesList"

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
    validator: validateInvoiceValue,
    required: true
  },
  { 
    label: "Factura",
    tag: "invoiceId",
    type: ColumType.OBJECT,
    relationship: getInvoiceList,
    fields: [],
  },
  { 
    type: ColumType.SELECT,
    label: "Tipo de pago",
    tag: "type",
    relationship: new Map([
      [PAYMENT_TYPE.CASH, withPaymentType(PaymetTypeTagTable, PAYMENT_TYPE.CASH)],
      [PAYMENT_TYPE.DIGITAL, withPaymentType(PaymetTypeTagTable, PAYMENT_TYPE.DIGITAL)]
    ]),
    minWidth: 80,
    required: true,
  },
  { 
    label: "Banco",
    tag: "bank",
    type: ColumType.OBJECT,
    relationship: getBanks,
    fields: ["name"],
  },
  { 
    label: "Usuario",
    tag: "user",
    type: ColumType.OBJECT,
    relationship: getUsers,
    fields: ["name", "lastname"],
  },
]

export default PAYMENTS_TABLE_COLUMNS