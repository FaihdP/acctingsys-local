import { invoke } from "@tauri-apps/api/tauri";

export interface Page {
  number: number,
  size: number
}

/**
 * @param collection mongodb collection name
 * @param filter search parameters
 * @param page number and size a data collection
 * @param sort data collection order
 * @returns data array
 */
export default async function find<T>(
  collection: string, 
  filter: Partial<T>, 
  page: Page = { 
    number: 1, 
    size: 10 
  },
  sort = {}
): Promise<T[]>  {
  try {
    return await invoke('find', { collection, filter, page, sort });
  } catch (err) {
    throw (err as Error)
  }
}