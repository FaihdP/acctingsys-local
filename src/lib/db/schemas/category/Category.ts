import MongoDocument from "../common/MongoDocument";

export default interface Category {
  name: string,
  fontColor: string,
  backgroundColor: string
}

export interface CategoryDocument extends Category, MongoDocument {}
