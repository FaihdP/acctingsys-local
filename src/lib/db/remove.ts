import { invoke } from "@tauri-apps/api/tauri";

/**

 */
export default async function remove(
  collection: string, 
  filter: object, 
): Promise<unknown>  {
  try {
    return await invoke('delete', { collection, filter });
  } catch (err) {
    throw (err as Error)
  }
}