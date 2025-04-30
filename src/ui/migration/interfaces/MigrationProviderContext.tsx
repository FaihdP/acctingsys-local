import { MappedObject } from "@ui/table/interfaces/Row";
import { ChangeEvent, Dispatch, MutableRefObject, SetStateAction } from "react";
import { DocumentsPendingCount } from "../hooks/MigrationProvider";
import MIGRATION_POPUP_STATUS from "../constants/MigrationPopupStatus";
import { TableConfigProps } from "@ui/table/interfaces/Table";

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
  handleStartMigration: () => Promise<void>,
  handleChangeMigrationFilter: (e: ChangeEvent<HTMLInputElement>) => void,
  migrationPopupStatus: MIGRATION_POPUP_STATUS,
  setMigrationPopupStatus: Dispatch<SetStateAction<MIGRATION_POPUP_STATUS>>,
  migration: MappedObject | null,
  setMigration: Dispatch<SetStateAction<MappedObject | null>>,
  migrationTableConfig: TableConfigProps
}