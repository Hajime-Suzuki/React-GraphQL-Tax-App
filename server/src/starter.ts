import app from './app'
import dbConnection from './database/connection'

app.listen(4000, () => {
  console.log('server is on 4000')
  dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
})
