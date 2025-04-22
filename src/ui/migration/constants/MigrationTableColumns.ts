import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration";
import { getFormatDateTime } from "@lib/util/time";
import { SelectComponentProps } from "@ui/table/interfaces/SelectComponent";
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table";
import { ComponentType } from "react";
import withMigrationStatus from "../components/withMigrationStatus";
import MigrationStatusTagTable from "../components/MigrationStatusTagTable";

const migrationStatusMap = new Map<string, ComponentType<SelectComponentProps>>()
Object.entries(MIGRATION_STATUS).forEach(([key, value]) => {
  migrationStatusMap.set(key, withMigrationStatus(MigrationStatusTagTable, value))
})

const MIGRATION_TABLE_COLUNMS: TableConfigHeaderProps["columns"] = [
  { 
    type: ColumType.DATE,
    label: "Fecha y hora",
    tag: "date",
    autocomplete: false,
    required: true,
    defaultValue: () => getFormatDateTime()
  },
  {
    type: ColumType.SELECT,
    label: "Estado",
    tag: "status",
    relationship: migrationStatusMap,
    required: true
  },
  {
    type: ColumType.NUMBER,
    label: "Facturas",
    tag: "invoices",
  },
  {
    type: ColumType.NUMBER,
    label: "Pagos",
    tag: "payments",
  },
  {
    type: ColumType.NUMBER,
    label: "Gastos",
    tag: "expenses",
  }
]

export default MIGRATION_TABLE_COLUNMS