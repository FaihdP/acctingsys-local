import { invoke } from "@tauri-apps/api/tauri";

export interface Page {
  number: number,
  size: number
}

type ToNumbers<T> = {
  [K in keyof T]: number
}

export interface FindResults<T> {
  pages_number: number,
  total_records: number,
  data: T
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
  filter: Partial<T> | any, 
  page: Page = { 
    number: 1, 
    size: 10 
  },
  sort = {},
  fields?: Partial<ToNumbers<T>>
): Promise<FindResults<T[]>>  {
  try {
    return await invoke('find', { collection, filter, page, sort, fields });
  } catch (err) {
    throw (err as Error)
  }
}