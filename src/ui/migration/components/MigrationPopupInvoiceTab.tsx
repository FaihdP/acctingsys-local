import MigrationInvoice from "@lib/db/schemas/migration/MigrationInvoice"
import { useContext, useEffect, useRef, useState } from "react"
import { MigrationProviderContext } from "../hooks/MigrationProvider"
import getMigrationInvoicesById from "@lib/services/migration/getMigrationInvoicesById"
import DynamicTable from "@ui/table/containers/DynamicTable"
import { ColumType, TableConfigProps } from "@ui/table/interfaces/Table"
import mapData from "@ui/table/util/mapData"
import { MappedObject } from "@ui/table/interfaces/Row"


export default function MigrationPopupInvoiceTab() {
  const { migration } = useContext(MigrationProviderContext)
  const [migrationInvoices, setMigrationInvoices] = useState<Map<string, MappedObject> | null>(null)
  const pagesNumber = useRef(1)

  useEffect(() => {
    const fetchMigrationInvoices = async () => {
      const migrationInvoices = await getMigrationInvoicesById(migration?._id?.$oid)
      setMigrationInvoices(mapData(migrationInvoices.data))
    }
    fetchMigrationInvoices()
  }, [])

  const migrationInvoicesTableConfig: TableConfigProps = {
    header: {
      picker: true,
      columns: [
        {
          type: ColumType.TEXT,
          label: "Id factura",
          tag: "invoiceId",
        },
        {
          type: ColumType.DATE,
          label: "Fecha y hora",
          tag: "invoiceDate",
          autocomplete: false,
        },
        {
          type: ColumType.CURRENCY,
          label: "Valor",
          tag: "value",
        },
        // {
        //   type: ColumType.SELECT,
        //   label: "Estado",
        //   tag: "status",
        //   //relationship: "status"p,
        //   //autocomplete: false,
        // },
      ],
    }
  }

  return (
    <div>
      <DynamicTable 
        config={migrationInvoicesTableConfig}
        initialData={migrationInvoices}
        pageSelected={1}
        setPageSelected={() => {}}
        pagesNumber={pagesNumber}
      /> 
    </div>
  )
}
