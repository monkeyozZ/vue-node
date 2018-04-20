'use strict'
import login from './login'
import menu from './menu'
export default app => {
  app.use('/login', login)
  app.use('/menu', menu)
}