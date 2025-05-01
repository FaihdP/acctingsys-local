import getUsers from "@lib/services/user/getUsers"
import { ColumType } from "@ui/table/interfaces/Table"

import { TableConfigHeaderProps } from "@ui/table/interfaces/Table"

const EXPENSES_TABLE_COLUMNS: TableConfigHeaderProps["columns"] = [
  {
    type: ColumType.DATE,
    label: "Fecha",
    tag: "date",
    autocomplete: false,
    width: 180
  },
  {
    type: ColumType.TEXT,
    label: "Titulo",
    tag: "title",
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
    width: 150
  },
  { 
    label: "Usuario",
    type: ColumType.OBJECT,
    tag: "user",
    relationship: getUsers,
    fields: ["name", "lastname"],
    defaultValue: { name: "Faihd", lastname: "Pineda" },
    width: 200
  },
]

export default EXPENSES_TABLE_COLUMNS
