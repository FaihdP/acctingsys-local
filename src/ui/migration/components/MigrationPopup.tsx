import { useContext, useState, useMemo } from "react"
import { MigrationProviderContext, RetryMigration } from "../hooks/MigrationProvider"
import getMigrationStatusText from "../util/getMigrationStatusText"
import getMigrationStatusStyles from "../util/getMigrationStatusStyles"
import MIGRATION_POPUP_STATUS from "../constants/MigrationPopupStatus"
import MigrationPopupTab from "./MigrationPopupTab"
import MigrationInvoicesTableColumns from "../constants/MigrationInvoicesTableColumns"
import getMigrationInvoicesById from "@lib/services/migration/getMigrationInvoicesById"
import getMigrationPaymentsById from "@lib/services/migration/getMigrationPaymentById"
import MigrationPaymentsTableColumns from "../constants/MigrationPayementsTableColumns"
import getMigrationExpensesById from "@lib/services/migration/getMigrationExpensesById"
import MigrationExpensesTableColumns from "../constants/MigrationExpensesTableColumns"

enum MIGRATION_POPUP_TAB {
  INVOICE,
  PAYMENT,
  EXPENSE
}

export default function MigrationPopup() {
  const { migration, setMigrationPopupStatus } = useContext(MigrationProviderContext)
  const [selectedTab, setSelectedTab] = useState<MIGRATION_POPUP_TAB>(MIGRATION_POPUP_TAB.INVOICE)
  
  const tabConfigs = useMemo(() => [
    {
      type: MIGRATION_POPUP_TAB.INVOICE,
      getData: getMigrationInvoicesById,
      label: "Facturas",
      tableConfig: {
        header: { picker: true, columns: MigrationInvoicesTableColumns },
        modifiers: {
          // onDeleteRowComponent: <RetryMigration />,
          // onDeleteRow: async (ids: string[]) => {
          //   for (const id of ids) {
          //     await updateMigrationInvoice(id, { $set: { migrated: false } })
          //   }
          // }
        }
      }
    },
    {
      type: MIGRATION_POPUP_TAB.PAYMENT,
      getData: getMigrationPaymentsById,
      label: "Pagos",
      tableConfig: {
        header: { picker: true, columns: MigrationPaymentsTableColumns },
        modifiers: {
          // onDeleteRowComponent: <RetryMigration />,
          // onDeleteRow: async (ids: string[]) => {
          //   console.log(ids)
          //   for (const id of ids) {
          //     await updateMigrationPayment(id, { $set: { migrated: false } })
          //   }
          // }
        }
      }
    },
    {
      type: MIGRATION_POPUP_TAB.EXPENSE,
      getData: getMigrationExpensesById,
      label: "Gastos",
      tableConfig: {
        header: { picker: true, columns: MigrationExpensesTableColumns },
        modifiers: {
          // onDeleteRowComponent: <RetryMigration />,
          // onDeleteRow: async (ids: string[]) => {
          //   for (const id of ids) {
          //     await updateMigrationExpense(id, { $set: { migrated: false } })
          //   }
          // }
        }
      }
    }
  ], [])

  return (
    <div
      className="
        absolute 
        w-[100vw] 
        h-[100vh] 
        top-0 
        left-0 
        z-10
        cursor-default 
        flex
        justify-center
        items-center
        bg-[rgba(0,0,0,0.26)]
        shadow-[0_0_30px_0px_rgba(0,0,0,0.25)]
      "
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="
          w-[75%]
          h-[80%]
          rounded-lg
          bg-white
          flex
          flex-col
          relative
        "
      >
        <div className="absolute flex w-full justify-end">
          <button 
            className="cursor-pointer text-[#7A7A7A] text-[20px] me-4 mt-2" 
            onClick={() => setMigrationPopupStatus(MIGRATION_POPUP_STATUS.HIDDEN)}
          >
            ⨉
          </button>
        </div>
        <div className="flex flex-row justify-start mt-5 ms-[30px]">
          <span className="text-[16px] text-[#7A7A7A]">Id</span>
          <span className="text-[16px] ms-[15px] text-[#5C5C5C] ">{ migration?._id?.$oid }</span>
          <span className="text-[16px] text-[#7A7A7A] ms-[40px]">Estado</span>
          <span
            style={getMigrationStatusStyles(migration?.status)}
            className={`inline-block mx-1 rounded-lg px-[6px] ms-[15px]`}
          >
            { getMigrationStatusText(migration?.status) }
          </span>
          <span className="text-[16px] text-[#7A7A7A] ms-[40px]">Fecha</span>
          <span className="text-[16px] ms-[15px] text-[#5C5C5C]">{ migration?.date }</span>
        </div>


        <div className="relative mt-[30px] flex flex-col flex-grow w-full">
          {/* Shadows */}          
          <div className="
            absolute 
            top-0 left-0 
            w-[300px] h-[25px] 
            z-0 pointer-events-none  
            ms-[30px] 
            shadow-[0_0_30px_0px_rgba(0,0,0,0.2)] 
            rounded-t-lg 
            bg-transparent
          "/>
          <div className="
            absolute top-[25px] left-0
            h-[calc(100%-25px)] w-full 
            z-0 pointer-events-none
            shadow-[0_0_30px_0px_rgba(0,0,0,0.25)] 
            rounded-b-lg bg-transparent
          "/>

          <div className="
            w-[300px] h-[25px] 
            ms-[30px]
            z-10 relative 
            grid grid-cols-3
            text-[12px]            
            text-[#5C5C5C]
          ">
            {tabConfigs.map((config, index) => (
              <div 
                key={config.type}
                className={`
                  h-full flex items-center justify-center cursor-pointer
                  ${index === 0 ? "rounded-tl-lg" : ""}
                  ${index === tabConfigs.length - 1 ? "rounded-tr-lg" : ""}
                  ${selectedTab === config.type ? "bg-white" : "border border-gray bg-[#F4F4F4]"}
                `} 
                onClick={() => setSelectedTab(config.type)}
              >
                {config.label}
              </div>
            ))}
          </div>

          <div className="
            flex flex-grow
            bg-white z-10 
            p-[30px]
            rounded-b-lg
          ">
            {tabConfigs.filter(config => config.type === selectedTab).map(config => (
              <div 
                key={config.type} 
                className="w-full flex"
              >
                <MigrationPopupTab
                  getData={config.getData}
                  tableConfig={config.tableConfig}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}