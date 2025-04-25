import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import MigrationStatusTagTable from "../components/MigrationStatusTagTable"
import withMigrationStatus from "../components/withMigrationStatus"
import { MappedObject } from "@ui/table/interfaces/Row"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import withStatus from "@ui/sales/components/withStatus"
import InvoiceStatusTagTable from "@ui/sales/components/InvoiceStatusTagTable"
import INVOICE_STATUS from "@lib/services/invoice/interfaces/InvoiceStatus"

const MigrationInvoicesTableColumns: TableConfigHeaderProps["columns"] = [
  {
    type: ColumType.TEXT,
    label: "Id factura",
    tag: "invoiceId",
  },
  {
    type: ColumType.DATE,
    label: "Fecha y hora",
    tag: "date",
    autocomplete: false,
  },
  {
    type: ColumType.CURRENCY,
    label: "Valor",
    tag: "value",
  },
  {
    type: ColumType.SELECT,
    label: "Estado factura",
    tag: "status",
    relationship: new Map([
      [INVOICE_STATUS.DEBT, withStatus(InvoiceStatusTagTable, INVOICE_STATUS.DEBT)],
      [INVOICE_STATUS.PAID, withStatus(InvoiceStatusTagTable, INVOICE_STATUS.PAID)],
    ]), 
  },
  // TODO: add component column
  {
    type: ColumType.TEXT,
    label: "Estado migración",
    tag: "x",
    // defaultValue: (row: MappedObject) => {
    //   console.log(row)
    //   console.log("TEST")
    //   return row.value.error ? MIGRATION_STATUS.FAILED : MIGRATION_STATUS.COMPLETED
    // }, 
    // relationship: new Map([
    //   [MIGRATION_STATUS.FAILED, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.FAILED)],
    //   [MIGRATION_STATUS.COMPLETED, withMigrationStatus(MigrationStatusTagTable, MIGRATION_STATUS.COMPLETED)],
    // ]), 
  },
  {
    type: ColumType.TEXT,
    label: "Errores",
    tag: "error", 
  },
]

export default MigrationInvoicesTableColumns