import { useContext, useState } from "react"
import { MigrationProviderContext } from "../hooks/MigrationProvider"
import Migration, { MigrationDocument } from "@lib/db/schemas/migration/Migration"
import getMigrationStatusText from "../util/getMigrationStatusText"
import getMigrationStatusStyles from "../util/getMigrationStatusStyles"
import MIGRATION_POPUP_STATUS from "../constants/MigrationPopupStatus"
import MigrationPopupPaymentTab from "./MigrationPopupPaymentTab"
import MigrationPopupExpenseTab from "./MigrationPopupExpenseTab"
import MigrationPopupInvoiceTab from "./MigrationPopupInvoiceTab"

enum MIGRATION_POPUP_TAB {
  INVOICE,
  PAYMENT,
  EXPENSE
}

export default function MigrationPopup() {
  const { migration, setMigrationPopupStatus } = useContext(MigrationProviderContext)
  const [selectedTab, setSelectedTab] = useState<MIGRATION_POPUP_TAB>(MIGRATION_POPUP_TAB.INVOICE)

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
          <span className="text-[16px] ms-[15px] text-[#5C5C5C]">{ migration?._id?.$oid }</span>
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
            <div 
              className={`
                h-full flex items-center justify-center  rounded-ss-lg cursor-pointer 
                ${selectedTab === MIGRATION_POPUP_TAB.INVOICE ? "bg-white" : "border border-gray bg-[#F4F4F4]"}
              `} 
              onClick={() => setSelectedTab(MIGRATION_POPUP_TAB.INVOICE)}
            >
              Facturas
            </div>
            <div 
              className={`
                h-full flex items-center justify-center  cursor-pointer 
                ${selectedTab === MIGRATION_POPUP_TAB.PAYMENT ? "bg-white" : "border border-gray bg-[#F4F4F4]"}
              `} 
              onClick={() => setSelectedTab(MIGRATION_POPUP_TAB.PAYMENT)}
            >
              Pagos
            </div>
            <div 
              className={`
                h-full flex items-center justify-center  cursor-pointer rounded-se-lg
                ${selectedTab === MIGRATION_POPUP_TAB.EXPENSE ? "bg-white" : "border border-gray bg-[#F4F4F4]"}
              `} 
              onClick={() => setSelectedTab(MIGRATION_POPUP_TAB.EXPENSE)}
            >
              Gastos
            </div>
          </div>

          <div className="
            flex flex-grow
            bg-white z-10 
            p-[30px]
          ">
            {selectedTab === MIGRATION_POPUP_TAB.INVOICE && <MigrationPopupInvoiceTab />}
            {selectedTab === MIGRATION_POPUP_TAB.PAYMENT && <MigrationPopupPaymentTab />}
            {selectedTab === MIGRATION_POPUP_TAB.EXPENSE && <MigrationPopupExpenseTab />}
          </div>
        </div>


      </div>
    </div>
  )
}