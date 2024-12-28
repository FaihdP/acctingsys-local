import handleError from "@lib/util/error/handleError";
import { invoke } from "@tauri-apps/api/tauri";

export default async function save<T>(
  collection: string, 
  objects: T[], 
): Promise<unknown>  {
  try {
    return await invoke('save', { collection, objects });
  } catch (err) {
    throw handleError(err)
  }
}