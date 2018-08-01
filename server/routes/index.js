'use strict'
import login from './login'
import menu from './menu'
import power from './power'
import authlogin from './authlogin'
import account from './account'
import role from './role'
export default app => {
  app.use('/login', login)
  app.use('/menu', menu)
  app.use('/power', power)
  app.use('/role', role)
  app.use('/authlogin', authlogin)
  app.use('/account', account)
}