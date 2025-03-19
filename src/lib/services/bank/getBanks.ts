import find from "@lib/db/repositories/find";
import Bank, { BankDocument } from "@lib/db/schemas/bank/Bank";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";

export default async function getBanks() {
  try {
    return await find<BankDocument>(COLLECTIONS.BANKS, {})
  } catch (error) {
    throw handleError(error)
  }
}