import find from "@lib/db/repositories/find"
import { BankDocument } from "@lib/db/schemas/bank/Bank"
import COLLECTIONS from "@lib/db/schemas/common/Collections"
import updateBank from "@lib/services/bank/updateBank"
import getBankDifferences from "@lib/services/bank/util/getBankDifferences"
import handleError from "@lib/util/error/handleError"

export default async function handleUpdateBank(bank: BankDocument): Promise<void>  {
  try {
    const oldBank = (await find<BankDocument>(COLLECTIONS.BANKS, { _id: { $oid: bank._id.$oid } })).data[0]
    const updateBankDifference = getBankDifferences(oldBank, bank)

    await updateBank(bank._id.$oid, updateBankDifference)
  } catch(err) {
    throw handleError(err)
  }
}