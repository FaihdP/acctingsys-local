import handleError from "@lib/util/error/handleError";
import Invoice from "../interfaces/Invoice";
import post from "../methods/post";

export interface InvoiceResponse {
  InvoiceID: string
  statusCode: number
  message?: string
}

export default async function saveInvoices(invoices: Invoice[]): Promise<InvoiceResponse[]> {
  try {
    return await post("/invoices/create", invoices)
  } catch (error) {
    throw error as Error
  }
}