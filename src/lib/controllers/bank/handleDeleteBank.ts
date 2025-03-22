import deleteBank from "@lib/services/bank/deleteBank";
import handleError from "@lib/util/error/handleError";

export default async function handleDeleteBank(bankId: string) {
  try {
    await deleteBank(bankId)
  } catch (error) {
    throw handleError(error)
  }
}
