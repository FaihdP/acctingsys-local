import { invoke } from "@tauri-apps/api/tauri";

export default async function update(
  collection: string, 
  filter: object, 
  object: object, 
): Promise<unknown>  {
  try {
    return await invoke('update', { collection, filter, object });
  } catch (err) {
    throw (err as Error)
  }
}