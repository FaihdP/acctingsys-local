import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration";
import { formatDate, getDateTime, getFormatDateTime } from "@lib/util/time";
import { SelectComponentProps } from "@ui/table/interfaces/SelectComponent";
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table";
import { ComponentType } from "react";
import withMigrationStatus from "../components/withMigrationStatus";
import MigrationStatusTagTable from "../components/MigrationStatusTagTable";

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
    relationship: new Map<string, ComponentType<SelectComponentProps>>([
      [MIGRATION_STATUS.COMPLETED, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.COMPLETED)],
      [MIGRATION_STATUS.FAILED, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.FAILED)],
      [MIGRATION_STATUS.PENDING, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.PENDING)],
      [MIGRATION_STATUS.PROCESSING, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.PROCESSING)],
      [MIGRATION_STATUS.UNCOMPLETED, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.UNCOMPLETED)],
    ]),
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