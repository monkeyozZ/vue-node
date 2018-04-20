'use strict'

import express from 'express'
import menu from '../Application/Admin/MenuController'
const router = express.Router()
router.post('/insert', menu.insert)
router.post('/index', menu.index)

export default router