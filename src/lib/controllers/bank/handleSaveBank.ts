import Bank from "@lib/db/schemas/bank/Bank";
import saveBanks from "@lib/services/bank/saveBanks";
import handleError from "@lib/util/error/handleError";

export default async function handleSaveBank(bank: Bank): Promise<void> {
  try {
    await saveBanks([bank])
  } catch(err) {
    throw handleError(err)
  }
}
