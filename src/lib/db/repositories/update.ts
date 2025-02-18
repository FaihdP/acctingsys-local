import { updateObject } from "@lib/services/invoiceProduct/util/getInvoiceProductDifferences";
import { invoke } from "@tauri-apps/api/tauri";

export default async function update<T>(
  collection: string, 
  filter: Partial<T>, 
  object: updateObject, 
): Promise<unknown>  {
  try {
    return await invoke('update', { collection, filter, object });
  } catch (err) {
    throw (err as Error)
  }
}