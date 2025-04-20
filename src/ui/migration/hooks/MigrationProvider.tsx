import { createContext, useEffect, useRef, useState } from "react";
import IMigrationProviderContext from "../interfaces/MigrationProviderContext";
import MigrationProviderProps from "../interfaces/MigrationProviderProps";
import { MappedObject } from "@ui/table/interfaces/Row";
import getMigrations from "@lib/services/migration/getMigrations";
import mapData from "@ui/table/util/mapData";

export const MigrationProviderContext = createContext({} as IMigrationProviderContext)

export function MigrationProvider({ children }: MigrationProviderProps) {
  const [documentsPendingCount, setDocumentsPendingCount] = useState<number[] | null>(null)
  const [migrations, setMigrations] = useState<Map<string, MappedObject> | null>(null)
  const [pageSelected, setPageSelected] = useState<number>(1)
  const pagesNumber = useRef<number>(1)
  const [migrationSearch, setMigrationSearch] = useState<string>()
  
  useEffect(() => {
    //const fetchDocumentsPendingCount = async () => setDocumentsPendingCount(get())
    //fetchDocumentsPendingCount()
  }, [setDocumentsPendingCount])

  useEffect(() => {
    const fetchMigrations = async () => {
      const response = await getMigrations({}, { number: pageSelected, size: 25 })
      setMigrations(mapData(response.data))
      pagesNumber.current = response.pages_number
    }
    fetchMigrations()
  }, [setMigrations, pageSelected])

  return (
    <MigrationProviderContext.Provider 
      value={{
        documentsPendingCount, setDocumentsPendingCount,
        migrations, setMigrations,
        migrationSearch, setMigrationSearch,
        pageSelected, setPageSelected,
        pagesNumber
      }}
    >
      { children }
    </MigrationProviderContext.Provider>
  )
}