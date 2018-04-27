'use strict'

import express from 'express'
import menu from '../Application/Admin/MenuController'
const router = express.Router()

router.get('/index', menu.index)
router.post('/insert', menu.insert)
router.get('/insert', menu.gettitle)
router.post('/index', menu.getonelist)
router.post('/update/:id', menu.MenuUpdate)
router.post('/delete', menu.MenuDelete)

export default router