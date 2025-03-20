import save from "@lib/db/repositories/save";
import Bank from "@lib/db/schemas/bank/Bank";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";

export default async function saveBanks(banks: Bank[]) {
  try {
    console.log(banks)
    return (await save<Bank>(COLLECTIONS.BANKS, banks))
  } catch (err) {
    throw handleError(err)
  }
}