import MongoDocument from "@schemas/common/MongoDocument"

export default interface Company {
  name: string
  logo: string
  address: string
}

export interface CompanyDocument extends Company, MongoDocument {}