import { invoke } from "@tauri-apps/api/tauri";

export default async function save(
  collection: string, 
  object: object, 
): Promise<unknown>  {
  try {
    return await invoke('save', { collection, object });
  } catch (err) {
    throw (err as Error)
  }
}