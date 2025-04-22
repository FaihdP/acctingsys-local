import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import { MouseEvent } from "react"
import { MIGRATION_STATUS_TEXTS } from "../constants/MigrationStatusTags"
import { MIGRATION_STATUS_STYLES } from "../constants/MigrationStatusTags"
import getMigrationStatusStyles from "../util/getMigrationStatusStyles"
import getMigrationStatusText from "../util/getMigrationStatusText"

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
  return (
    <span
      style={getMigrationStatusStyles(migrationStatus)}
      className={`inline-block mx-1 rounded-lg px-[6px]`}
      onClick={onClickSpan}
    >
      { getMigrationStatusText(migrationStatus) }
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