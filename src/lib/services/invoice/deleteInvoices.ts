import remove from "@lib/db/repositories/remove";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";

export default async function deleteInvoices(keys: string[]) {
  try {
    return keys.forEach(async key => await remove(COLLECTIONS.INVOICES, { _id: { $oid: key } }))
  } catch (err) {
    throw handleError(err)
  }
}