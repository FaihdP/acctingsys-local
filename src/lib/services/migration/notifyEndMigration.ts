import handleError from "@lib/util/error/handleError";
import { invoke } from "@tauri-apps/api/tauri";
export default async function notifyEndMigration() {
  try {
    await invoke("end_migration")
  } catch (error) {
    throw handleError(error)
  }
}
