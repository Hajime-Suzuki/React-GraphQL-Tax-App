import dbConnection from './database/connection'
import app from './app'
import server from './server'

app.listen({ port: 4000 }, () => {
  console.log(`server is on http://localhost:4000${server.graphqlPath}`)
  dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
})
