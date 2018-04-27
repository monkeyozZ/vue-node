'use strict'
import login from './login'
import menu from './menu'
import power from './power'
export default app => {
  app.use('/login', login)
  app.use('/menu', menu)
  app.use('/power', power)
}