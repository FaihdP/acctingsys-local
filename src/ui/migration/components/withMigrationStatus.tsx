import { MIGRATION_STATUS } from "@lib/db/schemas/migration/Migration";
import { SelectComponentProps } from "@ui/table/interfaces/SelectComponent";
import React, { ComponentType } from "react";

const withMigrationStatus = (
  Component: ComponentType<SelectComponentProps & { migrationStatus: MIGRATION_STATUS }>, 
  migrationStatus: MIGRATION_STATUS,
) => {
  const WrappedComponent = 
    (props: SelectComponentProps) => 
      <Component 
        {...props} 
        migrationStatus={migrationStatus}
      />

  return WrappedComponent
}

export default withMigrationStatus