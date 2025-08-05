import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"

const PERSON_TABLE_COLUMNS: TableConfigHeaderProps["columns"] = [
  {
    type: ColumType.TEXT,
    label: "Identificación",
    tag: "id",
  },
  {
    type: ColumType.TEXT,
    label: "Nombre",
    tag: "name",
  },
  {
    type: ColumType.TEXT,
    label: "Apellido",
    tag: "lastname",
  },
  {
    type: ColumType.TEXT,
    label: "Celular",
    tag: "phone",
  },
]

export default PERSON_TABLE_COLUMNS