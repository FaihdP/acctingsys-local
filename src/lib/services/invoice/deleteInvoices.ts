import remove from "@lib/db/repositories/remove";
import COLLECTIONS from "@lib/db/schemas/common/Collections";

export default async function deleteInvoices(key: string) {
  return await remove(COLLECTIONS.INVOICES, { _id: { $oid: key } })
}