import { MappedObject } from "@ui/table/interfaces/Row";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

export default interface MigrationProviderContext {
  documentsPendingCount: number[] | null
  setDocumentsPendingCount: Dispatch<SetStateAction<number[] | null>>
  migrations: Map<string, MappedObject> | null
  setMigrations: Dispatch<SetStateAction<Map<string, MappedObject> | null>>
  migrationSearch?: string
  setMigrationSearch: Dispatch<SetStateAction<string | undefined>>,
  pageSelected: number,
  setPageSelected: Dispatch<SetStateAction<number>>,
  pagesNumber: MutableRefObject<number>
}