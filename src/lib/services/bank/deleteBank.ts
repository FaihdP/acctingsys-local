import remove from "@lib/db/repositories/remove";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";

export default async function deleteBank(bankId: string) {
  try {
    await remove(COLLECTIONS.BANKS, { _id: { $oid: bankId }})
  } catch (error) {
    throw handleError(error)
  }
}
