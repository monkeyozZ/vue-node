'use strict'

import express from 'express'
import Authlogin from '../Application/Site/AuthLoginController'
const router = express.Router()
router.get('/gettoken', Authlogin.gettoken)
router.post('/index', Authlogin.index)

export default router