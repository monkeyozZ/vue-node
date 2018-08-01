'use strict'

import express from 'express'
import Role from '../Application/Admin/RoleController'
const router = express.Router()

router.post('/insert', Role.insert)
router.get('/index', Role.index)
router.post('/index', Role.getonelist)
router.post('/update/:id', Role.update)
router.post('/delete', Role.delete)

export default router