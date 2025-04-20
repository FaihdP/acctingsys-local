import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import { MouseEvent } from "react"

export default function MigrationStatusTagTable({ 
  onClickSpan, 
  onClickRemove,
  isEditable,
  migrationStatus,
}: { 
  onClickSpan: (e: MouseEvent<HTMLSpanElement>) => void , 
  onClickRemove: (e: MouseEvent<HTMLButtonElement>) => void,
  isEditable: boolean,
  migrationStatus: MIGRATION_STATUS,
}) {

  const MIGRATION_STATUS_TEXTS = {
    [MIGRATION_STATUS.COMPLETED]: "Completada",
    [MIGRATION_STATUS.FAILED]: "Fallida",
    [MIGRATION_STATUS.PENDING]: "Pendiente",
    [MIGRATION_STATUS.PROCESSING]: "En proceso",
    [MIGRATION_STATUS.UNCOMPLETED]: "Incompleta"
  }

  const MIGRATION_STATUS_STYLES = {
    [MIGRATION_STATUS.COMPLETED]: { backgroundColor: '#07F9A2', color: '#0D6948' },
    [MIGRATION_STATUS.FAILED]: { backgroundColor: '#FB8383', color: '#922323' },
    [MIGRATION_STATUS.PENDING]: { backgroundColor: '#E2E8F0', color: '#7A7A7A' },
    [MIGRATION_STATUS.PROCESSING]: { backgroundColor: '#8490FF', color: '#1A29AE' },
    [MIGRATION_STATUS.UNCOMPLETED]: { backgroundColor: '#FDFD5D', color: '#6D6A0F' }
  }
  
  const getMigrationStatusText = () => {
    return MIGRATION_STATUS_TEXTS[migrationStatus] || ""
  }
  
  const getMigrationStatusStyles = () => {
    return MIGRATION_STATUS_STYLES[migrationStatus] || { backgroundColor: '#E2E8F0', color: '#7A7A7A' }
  }

  return (
    <span
      style={getMigrationStatusStyles()}
      className={`inline-block mx-1 rounded-lg px-[6px]`}
      onClick={onClickSpan}
    >
      { getMigrationStatusText() }
      {
        isEditable &&
          <button 
            onClick={onClickRemove}
            className="
              ms-1 
              cursor-pointer 
              inline 
              text-inherit
            "
          >
            ⨉
          </button>
      }
    </span>
  )
}