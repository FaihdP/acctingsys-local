import InputSearchTable from "@ui/core/components/InputSearchTable";
import { ChangeEvent, useContext, useState } from "react";
import { MigrationProviderContext } from "../hooks/MigrationProvider";
import DynamicTable from "@ui/table/containers/DynamicTable";
import { TableConfigProps } from "@ui/table/interfaces/Table";
import MIGRATION_TABLE_COLUNMS from "../constants/MigrationTableColumns";
import MigrationIcon from "@public/dashboard/migration/MigrationIcon";
import Spin from "@ui/core/components/Spin";


export default function MigrationView() {
  const { 
    migrationSearch,
    setMigrationSearch, 
    migrations,
    pageSelected,
    pagesNumber,
    setPageSelected,
    handleStartMigration,
    documentsPendingCount
  } = useContext(MigrationProviderContext)
  
  const handleChangeMigrationFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setMigrationSearch(e.target.value)
  }

  const migrationTableConfig: TableConfigProps = {
    header: {
      columns: MIGRATION_TABLE_COLUNMS,
      picker: true,
      options: {
        onEdit: true
      }
    },
    actions: {
      onEdit: async () => {}
    }
  }

  return (
    <>
      <div className="flex flex-row justify-between">
        <InputSearchTable 
          data={migrations} 
          filter={migrationSearch || ""} 
          onChange={handleChangeMigrationFilter}
        />
        <button 
          onClick={handleStartMigration}
          className="
            h-[40px]
            bg-[#F4F4F4]
            placeholder-[#7A7A7A]
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            border
            rounded-lg 
            text-sm
            px-3
            relative
          "
        >
          <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-3 select-none text-[#7A7A7A]">
            <MigrationIcon />
          </div>
          <span className="ps-8 inline-block">Iniciar migración</span>
        </button>
      </div>
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-[100%] md:w-[25%] me-[50px]">
          <div className="
            shadow-[0_0_3px_0px_rgba(0,0,0,0.5)]
            rounded-lg
            overflow-auto
            text-[15px]
          ">
            <div className="
              h-[35px]
              top-0
              grid
              place-items-center              
              sticky
              overflow-auto
              shadow-[0_1px_3px_-1px_rgba(0,0,0,0.5)] 
              bg-white
            ">
              Pendientes de migración
            </div>
            <div className="
              flex
              flex-col
              bg-[#F4F4F4]
              py-[50px]
              text-center
            ">
              {
                documentsPendingCount ? (
                  <>
                    <span className="text-[32px]">{documentsPendingCount?.invoices}</span>
                    <span className="inline-block">Facturas</span>
                    <span className="mt-[25px] text-[32px]">{documentsPendingCount?.payments}</span>
                    <span className="inline-block">Pagos</span>
                    <span className="mt-[25px] text-[32px]">{documentsPendingCount?.expenses}</span>
                    <span className="inline-block">Gastos</span>
                  </>
                ) : (
                  <>
                    <span className="text-[32px]"><Spin />  </span>
                    <span className="inline-block">Facturas</span>
                    <span className="mt-[25px] text-[32px]"><Spin /></span>
                    <span className="inline-block">Pagos</span>
                    <span className="mt-[25px] text-[32px]"><Spin /></span>
                    <span className="inline-block">Gastos</span>
                  </>
                )
              }
            </div>
          </div>
        </div>
        <div className="w-[100%] md:w-[75%] mt-5 md:mt-0 flex-grow flex flex-col">
          <DynamicTable 
            config={migrationTableConfig}
            initialData={migrations}
            pageSelected={pageSelected}
            pagesNumber={pagesNumber}
            setPageSelected={setPageSelected}
          />
        </div>
      </div>
    </>
  )
}
