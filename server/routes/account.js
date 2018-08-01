'use strict'

import express from 'express'
import Account from '../Application/Admin/AccountController'
const router = express.Router()
router.post('/check', Account.checkname)
router.post('/insert', Account.insert)
router.get('/index', Account.index)
router.post('/update/:id', Account.update)
router.post('/delete', Account.delete)

export default router