import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import update from "@lib/db/repositories/update";
import { BankDocument } from "@lib/db/schemas/bank/Bank";
import COLLECTIONS from "@lib/db/schemas/common/Collections";
import handleError from "@lib/util/error/handleError";

export default async function updateBank(key: string, updateBankObject: MongoUpdateOptions<BankDocument>) {
  try {
    return (await update<BankDocument>(COLLECTIONS.BANKS, { _id: { $oid: key }}, updateBankObject))
  } catch (err) {
    throw handleError(err)
  }
}