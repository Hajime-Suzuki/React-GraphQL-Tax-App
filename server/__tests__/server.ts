import 'jest'
// import * as supertest from 'supertest'
import app from '../src/app'
import dbConnection from '../src/database/connection'

export const startServer = async () => {
  const server = app.listen(9000, () => {
    console.log('test!')
    dbConnection
      .then(mg => {
        console.log('DB')

        return mg.connection
      })
      .catch(e => console.log(e))
  })

  return server // return supertest(sv)
}
