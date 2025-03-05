
import { invoke } from "@tauri-apps/api/tauri";
import MongoUpdateOptions from "../interfaces/MongoUpdateOptions";

export default async function update<T>(
  collection: string, 
  filter: Partial<T>, 
  object: MongoUpdateOptions<T>, 
): Promise<unknown>  {
  try {
    return await invoke('update', { collection, filter, object });
  } catch (err) {
    throw (err as Error)
  }
}