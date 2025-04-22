import { ChangeEvent, createContext, useContext, useEffect, useRef, useState } from "react";
import IMigrationProviderContext from "../interfaces/MigrationProviderContext";
import MigrationProviderProps from "../interfaces/MigrationProviderProps";
import { MappedObject } from "@ui/table/interfaces/Row";
import getMigrations from "@lib/services/migration/getMigrations";
import mapData from "@ui/table/util/mapData";
import useForceRender from "@ui/core/hooks/useForceRender";
import { StartMigrationContext } from "@ui/startMigration/hooks/StartMigrationProvider";
import getPendingDocumentsCount from "@lib/services/migration/getPendingDocumentsCount";
import MIGRATION_POPUP_STATUS from "../constants/MigrationPopupStatus";

export const MigrationProviderContext = createContext({} as IMigrationProviderContext)

export interface DocumentsPendingCount {
  invoices: number
  payments: number
  expenses: number
}

export function MigrationProvider({ children }: MigrationProviderProps) {
  const [documentsPendingCount, setDocumentsPendingCount] = useState<DocumentsPendingCount | null>(null)
  const [migrations, setMigrations] = useState<Map<string, MappedObject> | null>(null)
  const [migration, setMigration] = useState<MappedObject | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  const [migrationSearch, setMigrationSearch] = useState<string>()
  const { render, forceRender } = useForceRender()
  const { startMigration } = useContext(StartMigrationContext)
  const [migrationPopupStatus, setMigrationPopupStatus] = useState<MIGRATION_POPUP_STATUS>(MIGRATION_POPUP_STATUS.VISIBLE)

  useEffect(() => {
    const fetchDocumentsPendingCount = async () => setDocumentsPendingCount(await getPendingDocumentsCount())
    fetchDocumentsPendingCount()
  }, [setDocumentsPendingCount])

  useEffect(() => {
    const fetchMigrations = async () => {
      const response = await getMigrations({}, { number: pageSelected, size: 25 })
      setMigrations(mapData(response.data))
      pagesNumber.current = response.pages_number
    }
    fetchMigrations()
  }, [setMigrations, pageSelected, render])

  const handleStartMigration = async () => {
    //await startMigration()
    forceRender()
  }

  const handleChangeMigrationFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setMigrationSearch(e.target.value)
  }

  return (
    <MigrationProviderContext.Provider 
      value={{
        documentsPendingCount, setDocumentsPendingCount,
        migrations, setMigrations,
        migrationSearch, setMigrationSearch,
        pageSelected, setPageSelected,
        pagesNumber,
        handleStartMigration,
        handleChangeMigrationFilter,
        migrationPopupStatus, setMigrationPopupStatus,
        migration, setMigration
      }}
    >
      { children }
    </MigrationProviderContext.Provider>
  )
}