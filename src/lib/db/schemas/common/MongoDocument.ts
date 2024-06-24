export default interface MongoDocument {
  _id: {
    $oid: string
  },
  __v: number
}