import MongoUpdateOptions from "@lib/db/interfaces/MongoUpdateOptions";
import { BankDocument } from "@lib/db/schemas/bank/Bank";

export default function getBankDifferences(oldBank: BankDocument, newBank: BankDocument): MongoUpdateOptions<BankDocument> {
  const result: MongoUpdateOptions<BankDocument> = {}
  result.$set = {}

  if (oldBank.name !== newBank.name) result.$set.name = newBank.name
  if (oldBank.fontColor !== newBank.fontColor) result.$set.fontColor = newBank.fontColor
  if (oldBank.backgroundColor !== newBank.backgroundColor) result.$set.backgroundColor = newBank.backgroundColor

  return result
}