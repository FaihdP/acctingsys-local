type MongoUpdateOptions<T> = {
  $set?: Partial<T>,
  $unset?: Partial<Record<keyof T, "">>
}

export default MongoUpdateOptions