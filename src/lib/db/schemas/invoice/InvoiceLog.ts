import MongoDocument from "@schemas/common/MongoDocument";

export enum INVOICE_LOG_ACTION {
  ADD = "ADD",
  UPDATE = "UPDATE",
  DELETE = "DELETE",
  ADD_INVOICE_PRODUCT = "ADD_INVOICE_PRODUCT",
  UPDATE_INVOICE_PRODUCT = "UPDATE_INVOICE_PRODUCT",
  DELETE_INVOICE_PRODUCT = "DELETE_INVOICE_PRODUCT",
  ADD_ERROR = "ADD_ERROR",
  UPDATE_ERROR = "UPDATE_ERROR",
  DELETE_ERROR = "DELETE_ERROR"
}

export default interface InvoiceLog {
  invoiceId: string,
  date: string,
  action: string,
  description?: string,
  userId: string
}

export interface InvoiceLogDocument extends InvoiceLog, MongoDocument {}