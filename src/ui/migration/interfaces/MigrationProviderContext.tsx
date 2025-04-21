import { MappedObject } from "@ui/table/interfaces/Row";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { DocumentsPendingCount } from "../hooks/MigrationProvider";

export default interface MigrationProviderContext {
  documentsPendingCount: DocumentsPendingCount | null
  setDocumentsPendingCount: Dispatch<SetStateAction<DocumentsPendingCount | null>>
  migrations: Map<string, MappedObject> | null
  setMigrations: Dispatch<SetStateAction<Map<string, MappedObject> | null>>
  migrationSearch?: string
  setMigrationSearch: Dispatch<SetStateAction<string | undefined>>,
  pageSelected: number,
  setPageSelected: Dispatch<SetStateAction<number>>,
  pagesNumber: MutableRefObject<number>,
  handleStartMigration: () => Promise<void>
}