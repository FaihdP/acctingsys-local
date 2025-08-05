import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration"
import { MouseEvent } from "react"
import getMigrationStatusStyles from "../util/getMigrationStatusStyles"
import getMigrationStatusText from "../util/getMigrationStatusText"
import Spin from "@ui/core/components/Spin"

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
      { migrationStatus === MIGRATION_STATUS.PROCESSING && <Spin size={10} className="ms-2   mb-1" /> }
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