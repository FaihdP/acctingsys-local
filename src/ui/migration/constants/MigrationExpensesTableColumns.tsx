import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import MigrationStatusTagTable from "../components/MigrationStatusTagTable"
import withMigrationStatus from "../components/withMigrationStatus"
import { MappedObject } from "@ui/table/interfaces/Row"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment"
import PaymentTypeTagTable from "@ui/payments/components/PaymentTypeTagTable"
import withPaymentType from "@ui/payments/components/withPaymentType"

const MigrationExpensesTableColumns: TableConfigHeaderProps["columns"] = [ 
  {
    type: ColumType.TEXT,
    label: "Id gasto",
    tag: "expenseId",
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
    type: ColumType.TEXT,
    label: "Titulo",
    tag: "title",
  },
  {
    type: ColumType.TEXT,
    label: "Descripción",
    tag: "description",
  },
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

export default MigrationExpensesTableColumns