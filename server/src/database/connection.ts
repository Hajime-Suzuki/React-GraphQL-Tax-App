import * as mongoose from 'mongoose'
import connectionString from './connectionString'

export default mongoose.connect(
  connectionString,
  { useNewUrlParser: true }
)
