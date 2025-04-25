import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import MigrationStatusTagTable from "../components/MigrationStatusTagTable"
import withMigrationStatus from "../components/withMigrationStatus"
import { MappedObject } from "@ui/table/interfaces/Row"
import { ColumType, TableConfigHeaderProps } from "@ui/table/interfaces/Table"
import { PAYMENT_TYPE } from "@lib/db/schemas/payment/Payment"
import PaymentTypeTagTable from "@ui/payments/components/PaymentTypeTagTable"
import withPaymentType from "@ui/payments/components/withPaymentType"

const MigrationPaymentsTableColumns: TableConfigHeaderProps["columns"] = [
  {
    type: ColumType.TEXT,
    label: "Id factura",
    tag: "invoiceId",
  },
  {
    type: ColumType.TEXT,
    label: "Id pago",
    tag: "paymentId",
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
    label: "Tipo",
    tag: "type",
    relationship: new Map([
      [PAYMENT_TYPE.CASH, withPaymentType(PaymentTypeTagTable, PAYMENT_TYPE.CASH)],
      [PAYMENT_TYPE.DIGITAL, withPaymentType(PaymentTypeTagTable, PAYMENT_TYPE.DIGITAL)],
    ])
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

export default MigrationPaymentsTableColumns