import getUsers from "@lib/services/user/getUsers"
import { formatDate } from "@lib/util/time"
import { getDateTime } from "@lib/util/time"
import { ColumType } from "@ui/table/interfaces/Table"

import { TableConfigHeaderProps } from "@ui/table/interfaces/Table"

const EXPENSES_TABLE_COLUMNS: TableConfigHeaderProps["columns"] = [
  {
    type: ColumType.DATE,
    label: "Fecha",
    tag: "date",
    autocomplete: false,
    required: true,
    width: 180,
    defaultValue: () => formatDate(getDateTime())
  },
  {
    type: ColumType.TEXT,
    label: "Titulo",
    tag: "title",
    required: true,
    width: 200
  },
  {
    type: ColumType.TEXT,
    label: "Descripción",
    tag: "description",
  },
  {
    type: ColumType.CURRENCY,
    label: "Valor",
    tag: "value",
    required: true,
    width: 150
  },
  { 
    label: "Usuario",
    type: ColumType.OBJECT,
    tag: "user",
    relationship: getUsers,
    required: true,
    fields: ["name", "lastname"],
    defaultValue: { name: "Faihd", lastname: "Pineda" },
    width: 200
  },
]

export default EXPENSES_TABLE_COLUMNS
