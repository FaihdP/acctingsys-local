import MongoDocument from "@schemas/common/MongoDocument";

export default interface InvoiceLog {
  invoiceId: string,
  date: string,
  action: string,
  description: string,
  userId: string
}

export interface InvoiceLogDocument extends InvoiceLog, MongoDocument {}