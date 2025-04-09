import { createContext, useEffect, useState } from "react";
import IMigrationProviderContext from "../interfaces/MigrationProviderContext";
import MigrationProviderProps from "../interfaces/MigrationProviderProps";
import { MappedObject } from "@ui/table/interfaces/Row";

export const MigrationProviderContext = createContext({} as IMigrationProviderContext)

export function MigrationProvider({ children }: MigrationProviderProps) {
  const [documentsPendingCount, setDocumentsPendingCount] = useState<number[] | null>(null)
  const [migrations, setMigrations] = useState<Map<string, MappedObject> | null>(null)
  const [migrationSearch, setMigrationSearch] = useState<string>()
  
  useEffect(() => {
    //const fetchDocumentsPendingCount = async () => setDocumentsPendingCount(get())
    //fetchDocumentsPendingCount()
  }, [setDocumentsPendingCount])

  useEffect(() => {
    //const fetchMigrations = async () => setMigrations(get())
    //fetchMigrations()
  }, [setMigrations])

  return (
    <MigrationProviderContext.Provider 
      value={{
        documentsPendingCount, setDocumentsPendingCount,
        migrations, setMigrations,
        migrationSearch, setMigrationSearch
      }}
    >
      { children }
    </MigrationProviderContext.Provider>
  )
}