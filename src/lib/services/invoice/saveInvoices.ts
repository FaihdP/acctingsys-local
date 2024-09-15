import { Invoice } from "@lib/db/schemas/invoice/Invoice";

export default async function saveInvoices(data: Invoice[]) {
  console.log(data)
}