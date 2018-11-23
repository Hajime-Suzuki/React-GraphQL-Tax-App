import * as mongoose from 'mongoose'

let dbString = process.env.DB_STRING || 'mongodb://localhost:27017/Tax'
if (process.env.NODE_ENV === 'test') {
  dbString = process.env.DB_STRING_TEST || 'mongodb://localhost:27017/Tax-TEST'
}

mongoose.Types.ObjectId.prototype.valueOf = function() {
  return this.toString()
}

console.log({ dbString })
export default mongoose.connect(
  dbString,
  { useNewUrlParser: true }
)
