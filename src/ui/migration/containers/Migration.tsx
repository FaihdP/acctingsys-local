import { MigrationProvider } from "../hooks/MigrationProvider";
import MigrationView from "./MigrationView";

export default function Migration() {
  return (
    <MigrationProvider>
      <MigrationView />
    </MigrationProvider>
  )
}
