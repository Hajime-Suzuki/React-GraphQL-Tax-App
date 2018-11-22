import dbConnection from './database/connection'
import app from './app'

app.listen(4000, () => {
  console.log('server is on 4000')
  dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
})
