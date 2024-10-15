import remove from "@lib/db/repositories/remove";

export default async function deleteInvoices(key: string) {
  return await remove("invoices", { _id: { $oid: key } })
}