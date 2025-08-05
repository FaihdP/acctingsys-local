type MongoUpdateOptions<T> = {
  $set?: Partial<T>,
  $unset?: Partial<Record<keyof T, "">>
  $inc?: Partial<Record<keyof T, number>>
}

export default MongoUpdateOptions