import MongoDocument from "../common/MongoDocument";

export default interface Bank {
  name: string,
  fontColor: string,
  backgroundColor: string
}

export interface BankDocument extends Bank, MongoDocument {}
