import getCategories from "@lib/services/category/getCategories";
import getUsers from "@lib/services/user/getUsers";
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table";

const INVENTORY_DEFAULT_COLUMNS: TableConfigHeaderProps["columns"] = [
  {
    type: ColumType.TEXT,
    label: "Nombre",
    tag: "name",
    required: true,
    width: 300
  },
  {
    type: ColumType.CURRENCY,
    label: "Valor",
    tag: "value",
    required: true,
    width: 100
  },
  {
    type: ColumType.NUMBER,
    label: "Cantidad",
    tag: "quantity",
    width: 150
  },
  { 
    label: "Tipo",
    type: ColumType.OBJECT,
    tag: "category",
    relationship: getCategories,
    fields: ["name"],
  },
  { 
    label: "Usuario",
    type: ColumType.OBJECT,
    tag: "user",
    relationship: getUsers,
    required: true,
    fields: ["name", "lastname"],
  },
]

export default INVENTORY_DEFAULT_COLUMNS