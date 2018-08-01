'use strict'

import express from 'express'
import Power from '../Application/Admin/PowerController'
const router = express.Router()

router.get('/index', Power.index)
router.post('/index', Power.getonelist)
router.post('/insert', Power.insert)
router.post('/update/:id', Power.update)
router.post('/delete', Power.delete)
router.post('/routelist', Power.routelist)
router.post('/roleid', Power.roleid)

export default router