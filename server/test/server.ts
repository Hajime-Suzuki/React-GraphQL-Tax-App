import 'jest'
import * as supertest from 'supertest'
import app from '../src/app'
import dbConnection from '../src/database/connection'

export const startServer = async (): Promise<any> => {
  const sv = app.listen(5000, () => {
    dbConnection.then(() => console.log('DB')).catch(e => console.log(e))
  })

  return supertest(sv)
}
