import * as mongoose from 'mongoose'

export default mongoose.connect(
  process.env.DB_STRING || 'mongodb://localhost:27017/Tax',
  { useNewUrlParser: true }
)
